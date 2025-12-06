using Microsoft.AspNetCore.Mvc;

public class PoductControllers : ControllerBase
{
 private  readonly ILogger<PoductControllers> _logger;
 public PoductControllers(ILogger<PoductControllers> logger)
 {
    _logger = logger;
 }


}