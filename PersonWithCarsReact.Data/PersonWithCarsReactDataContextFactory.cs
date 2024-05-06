using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PersonWithCarsReact.Data;

public class PersonWithCarsReactDataContextFactory : IDesignTimeDbContextFactory<PersonWithCarsReactDataContext>
{
    public PersonWithCarsReactDataContext CreateDbContext(string[] args)
    {
        var config = new ConfigurationBuilder()
           .SetBasePath(Path.Combine(Directory.GetCurrentDirectory(), 
           $"..{Path.DirectorySeparatorChar}PersonWithCarsReact.Web"))
           .AddJsonFile("appsettings.json")
           .AddJsonFile("appsettings.local.json", optional: true, reloadOnChange: true).Build();

        return new PersonWithCarsReactDataContext(config.GetConnectionString("ConStr"));
    }
}