﻿using API.DTOs.Request;
using API.DTOs.Response;
using API.Interfaces.Procurement;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProcurementController : ControllerBase
    {
        private readonly IProcurementService _procurementService;
        private readonly ILogger<AuthController> _logger;

        public ProcurementController(
            IProcurementService procurementService,
            ILogger<AuthController> logger
        )
        {
            _procurementService = procurementService;
            _logger = logger;
        }

        [HttpPost("create")]
        public async Task<ActionResult<ProcurementResponseDto>> CreateProcurement(
            ProcuremnetDto procurementDto
        )
        {
            try
            {
                var result = await _procurementService.CreateProcurement(procurementDto);

                return result
                    ? Ok("Procurement created")
                    : BadRequest("Procurement not be created");
            }
            catch (Exception ex)
            {
                _logger.LogError("{ErrorMessage}", ex.Message);

                return StatusCode(
                    StatusCodes.Status500InternalServerError,
                    new { response = "Something went wrong." }
                );
            }
        }

        [HttpDelete("delete")]
        public async Task<ActionResult<bool>> DeleteProcurement(int id)
        {
            try
            {
                var result = await _procurementService.DeleteProcurement(id);

                return Created("Procurement deleted", result);
            }
            catch (Exception ex)
            {
                _logger.LogError("{ErrorMessage}", ex.Message);

                return StatusCode(
                    StatusCodes.Status500InternalServerError,
                    new { response = "Something went wrong." }
                );
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ProcurementResponseDto>> GetProcurementById(int id)
        {
            try
            {
                var result = await _procurementService.GetProcurement(id);

                return result;
            }
            catch (Exception ex)
            {
                _logger.LogError("{ErrorMessage}", ex.Message);

                return StatusCode(
                    StatusCodes.Status500InternalServerError,
                    new { response = "Something went wrong." }
                );
            }
        }

        [HttpGet()]
        public async Task<ActionResult<List<ProcurementResponseDto>>> GetProcurements([FromQuery]
            GetProcurementsDto getProcurementsDto
        )
        {
            try
            {
                var result = await _procurementService.GetProcurements(getProcurementsDto);

                return Created(" Get All Procurements successful", result);
            }
            catch (Exception ex)
            {
                _logger.LogError("{ErrorMessage}", ex.Message);

                return StatusCode(
                    StatusCodes.Status500InternalServerError,
                    new { response = "Something went wrong." }
                );
            }
        }
    }
}
