using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PersonWithCarsReact.Data
{
    public class PeopleCarsRepo
    {
        private readonly string _connection;

        public PeopleCarsRepo(string connection)
        {
            _connection = connection;
        }

        public List<Person> GetAllPeopleWithCars()
        {
            using var context = new PersonWithCarsReactDataContext(_connection);
            return context.People.Include(p => p.Cars).ToList();
        }

        public void AddPerson(Person person)
        {
            using var context = new PersonWithCarsReactDataContext(_connection);
            context.People.Add(person);
            context.SaveChanges();
        }

        public Person GetById(int id)
        {
            using var context = new PersonWithCarsReactDataContext(_connection);
            return context.People.FirstOrDefault(p => p.Id == id);
        }

        public void AddCar(Car car)
        {
            using var context = new PersonWithCarsReactDataContext(_connection);
            context.Cars.Add(car);
            context.SaveChanges();
        }

        public List<Car> GetCarsForPerson(int id)
        {
            using var context = new PersonWithCarsReactDataContext(_connection);
            return context.Cars.Where(c => c.PersonId == id).ToList();
        }

        public void Delete(List<Car> Cars)
        {
            using var context = new PersonWithCarsReactDataContext(_connection);
            foreach(Car car in Cars)
            {
                context.Remove(car);
            }
            context.SaveChanges();
        }

    }
}
