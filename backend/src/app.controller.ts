import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { InvoiceService } from './invoice/invoice.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly invoiceService: InvoiceService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('reset')
  reset(): void {
    this.invoiceService.reset();
  }

  @Get('clean')
  clean(): void {
    this.invoiceService.clean();
  }
}
