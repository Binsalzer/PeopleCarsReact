using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PersonWithCarsReact.Data;

namespace PersonWithCarsReact.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PeopleCarsController : ControllerBase
    {
        private string _connection;

        public PeopleCarsController(IConfiguration configuration)
        {
            _connection = configuration.GetConnectionString("ConStr");
        }

        [Route("getall")]
        public List<Person> GetAll()
        {
            var repo = new PeopleCarsRepo(_connection);
            return repo.GetAllPeopleWithCars();
        }

        [HttpPost("AddPerson")]
        public void AddPerson(Person person)
        {
            var repo = new PeopleCarsRepo(_connection);
            repo.AddPerson(person);
        }

        [HttpGet("getbyid")]
        public Person GetById(int id)
        {
            var repo = new PeopleCarsRepo(_connection);
            return repo.GetById(id);
        }

        [HttpPost("addcar")]
        public void AddCar(Car car)
        {
            var repo = new PeopleCarsRepo(_connection);
            repo.AddCar(car);
        }

        [HttpGet("getcarsforperson")]
        public List<Car> GetCarsForPerson(int id)
        {
            var repo = new PeopleCarsRepo(_connection);
            return repo.GetCarsForPerson(id);
        }

        [HttpPost("delete")]
        public void Delete(List<Car> Cars)
        {
            var repo = new PeopleCarsRepo(_connection);
            repo.Delete(Cars);
        }
    }
}
