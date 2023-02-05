using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<TodoDb>(opt => opt.UseInMemoryDatabase("TodoList"));
builder.Services.AddDatabaseDeveloperPageExceptionFilter();

var port = Environment.GetEnvironmentVariable("PORT") ?? "8081";
builder.WebHost.UseUrls($"http://0.0.0.0:{port}");
var app = builder.Build();

app.MapGet("/api/todoitems", async (TodoDb db) =>
    await db.Todos.ToListAsync());

app.MapGet("/api/todoitems/complete", async (TodoDb db) =>
    await db.Todos.Where(t => t.Completed).ToListAsync());

app.MapGet("/api/todoitems/{id}", async (int id, TodoDb db) =>
    await db.Todos.FindAsync(id)
        is Todo todo
            ? Results.Ok(todo)
            : Results.NotFound());

app.MapPost("/api/todoitems", async (Todo todo, TodoDb db) =>
{
    db.Todos.Add(todo);
    await db.SaveChangesAsync();
    // return a result object
    // a result object is a container for the object to be serialized
    // and the status code
    return Results.Created($"/api/todoitems/{todo.Id}", todo);
});

app.MapPut("/api/todoitems/{id}", async (int id, Todo inputTodo, TodoDb db) =>
{
    var todo = await db.Todos.FindAsync(id);
    if (todo is null) return Results.NotFound();

    todo.Title = inputTodo.Title;
    todo.Description = inputTodo.Description;
    todo.Completed = inputTodo.Completed;
    todo.CreatedAt = inputTodo.CreatedAt;

    await db.SaveChangesAsync();

    return Results.NoContent();
});

app.MapDelete("/api/todoitems/{id}", async (int id, TodoDb db) =>
{
    if (await db.Todos.FindAsync(id) is Todo todo)
    {
        db.Todos.Remove(todo);
        await db.SaveChangesAsync();
        return Results.Ok(todo);
    }

    return Results.NotFound();
});

app.UseDefaultFiles();
app.UseStaticFiles();
app.MapFallbackToFile("index.html");

app.Run();