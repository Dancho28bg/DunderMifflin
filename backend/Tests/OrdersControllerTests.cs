using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Moq;
using backend.Controllers;
using backend.Data;
using backend.DTOs;
using backend.Models;
using Xunit;

namespace backend.Tests
{
    public class OrdersControllerTests
    {
        private readonly Mock<ApplicationDbContext> _contextMock;

        public OrdersControllerTests()
        {
            _contextMock = new Mock<ApplicationDbContext>();
        }

        [Fact]
        public async Task CreateOrder_ReturnsBadRequest_WhenModelIsInvalid()
        {
            var controller = new OrdersController(_contextMock.Object);
            controller.ModelState.AddModelError("CustomerId", "Required");

            var result = await controller.CreateOrder(new OrderDto { OrderEntries = new List<OrderEntryDto>() });

            Assert.IsType<BadRequestObjectResult>(result.Result);
        }
    }
}