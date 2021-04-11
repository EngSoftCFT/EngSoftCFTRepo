using System;
using System.Linq;
using System.Reflection;
using System.Text.Json;
using System.Text.Json.Serialization;
using ClinicControlCenter.Configuration;
using ClinicControlCenter.Data;
using ClinicControlCenter.Domain.Models;
using ClinicControlCenter.Security;
using IdentityServer4.Services;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using SDK.EntityRepository;
using SDK.Utils;

namespace ClinicControlCenter
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<DbContext, ApplicationDbContext>(options =>
                {
                    var pgSqlConnection = Configuration.GetConnectionString("PQSqlConnection");
                    var msSqlConnection = Configuration.GetConnectionString("MSSqlConnection");

                    if (!string.IsNullOrWhiteSpace(pgSqlConnection))
                        options.UseNpgsql(pgSqlConnection);
                    else if (!string.IsNullOrWhiteSpace(msSqlConnection))
                        options.UseSqlServer(msSqlConnection);
                }
            );

            services.AddDatabaseDeveloperPageExceptionFilter();

            services.AddIdentity<User, IdentityRole>()
                    .AddEntityFrameworkStores<DbContext>()
                    .AddDefaultUI()
                    .AddDefaultTokenProviders();

            services.AddIdentityServer()
                    .AddApiAuthorization<User, ApplicationDbContext>();

            services.AddTransient<IProfileService, ProfileService>();

            services.AddAuthentication()
                    .AddIdentityServerJwt();

            services.AddAuthorization(SecurityConfig.GetPolicies);

            services.AddControllersWithViews()
                    .AddJsonOptions(options =>
                    {
                        options.JsonSerializerOptions.PropertyNamingPolicy = null;

                        options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
                        options.JsonSerializerOptions.Converters.Add(new HandleSpecialDoublesAsStrings_NewtonsoftCompat());
                    });

            services.AddCors(options => options
                .AddDefaultPolicy(builder =>
                    builder.AllowAnyOrigin()
                           .AllowAnyHeader()
                           .AllowAnyMethod()));

            services.AddMiniProfiler(options =>
                        options.RouteBasePath = "/profiler"
                    )
                    .AddEntityFramework();

            services.AddSwaggerGen(options =>
            {
                //options.AddSecurityDefinition("Autentication", new OpenApiSecurityScheme {
                //    OpenIdConnectUrl = new Uri("https://localhost:44304/.well-known/openid-configuration"),
                //    Flows = new OpenApiOAuthFlows()
                //    {
                //        Implicit = new OpenApiOAuthFlow()
                //    }
                //});
                options.AddSecurityDefinition("oauth2",
                    new OpenApiSecurityScheme
                    {
                        Type = SecuritySchemeType.OAuth2,
                        Flows = new OpenApiOAuthFlows
                        {
                            Implicit = new OpenApiOAuthFlow
                            {
                                AuthorizationUrl = new Uri("https://localhost:44304/Identity/Account/Login"),
                                TokenUrl         = new Uri("https://localhost:44304/connect/token"),
                            }
                        }
                    });
            });

            services.AddRazorPages();
            // In production, the Angular files will be served from this directory
            services.AddSpaStaticFiles(configuration => { configuration.RootPath = "ClientApp/dist"; });

            AddDependencyInjectionServices(services);
        }

        private void AddDependencyInjectionServices(IServiceCollection services)
        {
            services.AddAutoMapper(typeof(AutoMapperProfile));

            services.AddScoped(typeof(IEntityRepository<>), typeof(EntityRepository<>));
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, IServiceProvider services)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseMigrationsEndPoint();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseCors();

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            if (!env.IsDevelopment())
            {
                app.UseSpaStaticFiles();
            }

            app.UseMiniProfiler();

            app.UseSwagger();
            var assembly = GetType().Assembly;
            var swaggerResourceName = GetSwaggerResourceName(assembly);
            app.UseSwaggerUI(c => { c.IndexStream = () => assembly.GetManifestResourceStream(swaggerResourceName); });

            app.UseRouting();

            app.UseAuthentication();
            app.UseIdentityServer();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller}/{action=Index}/{id?}");
                endpoints.MapRazorPages();
            });

            app.UseSpa(spa =>
            {
                // To learn more about options for serving an Angular SPA from ASP.NET Core,
                // see https://go.microsoft.com/fwlink/?linkid=864501

                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseAngularCliServer(npmScript: "start");
                }
            });

            if (Configuration.GetValue("PermissionSystem:SetupSecurityAtStartup", false))
                SecurityConfig.Setup(services).GetAwaiter().GetResult();
        }

        private static string GetSwaggerResourceName(Assembly assembly)
        {
            //Getting names of all embedded resources
            var allResourceNames = assembly.GetManifestResourceNames();
            //Selecting first one. 
            var resourceName =
                allResourceNames.FirstOrDefault(x =>
                    x.Contains("swagger", StringComparison.InvariantCultureIgnoreCase));

            return resourceName;
        }
    }
}