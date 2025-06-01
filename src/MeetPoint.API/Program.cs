using MeetPoint.Infrastructure.Identity;

var builder = WebApplication.CreateBuilder(args);

builder.Services
    .AddIdentityValidation()
    .AddJwtAuth(builder.Configuration)
    .AddOpenApi();

builder.Services.AddControllers();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseCors(x => x.AllowAnyMethod().AllowAnyHeader().SetIsOriginAllowed(origin => true).AllowCredentials());

app.MapControllers();
app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();

app.Run();
