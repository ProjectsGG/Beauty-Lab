import { Component, OnInit } from '@angular/core';
import {
  PayPal,
  PayPalPayment,
  PayPalConfiguration
} from '@ionic-native/paypal/ngx';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.page.html',
  styleUrls: ['./deposit.page.scss']
})
export class DepositPage implements OnInit {
  constructor(private payPal: PayPal, public toastr: ToastService) {}
  paymentAmount = '1.00';
  currency = 'USD';
  currencyIcon = '$';
  ngOnInit() {}
  payWithPaypal() {
    this.payPal
      .init({
        PayPalEnvironmentProduction: 'Ae2Jz-_zB0fS_boKQr7kY9MZwla__TVt_vLAwhEWeCFnYmUV7wpfJOYfUgpGNggGty2QEvclkxqdaYVL',
        PayPalEnvironmentSandbox:
          'yungprince333333-facilitator@gmail.com'
      })
      .then(
        () => {
          // Environments: PayPalEnvironmentNoNetwork, PayPalEnvironmentSandbox, PayPalEnvironmentProduction
          this.payPal
            .prepareToRender(
              'PayPalEnvironmentSandbox',
              new PayPalConfiguration({
                // Only needed if you get an 'Internal Service Error' after PayPal login!
                // payPalShippingAddressOption: 2 // PayPalShippingAddressOptionPayPal
              })
            )
            .then(
              () => {
                const payment = new PayPalPayment(
                  this.paymentAmount,
                  this.currency,
                  'Description',
                  'sale'
                );
                this.payPal.renderSinglePaymentUI(payment).then(
                  res => {
                    this.toastr.success('Successful payment');
                    // Successfully paid

                    // Example sandbox response
                    //
                    // {
                    //   'client': {
                    //     'environment': 'sandbox',
                    //     'product_name': 'PayPal iOS SDK',
                    //     'paypal_sdk_version': '2.16.0',
                    //     'platform': 'iOS'
                    //   },
                    //   'response_type': 'payment',
                    //   'response': {
                    //     'id': 'PAY-1AB23456CD789012EF34GHIJ',
                    //     'state': 'approved',
                    //     'create_time': '2016-10-03T13:33:33Z',
                    //     'intent': 'sale'
                    //   }
                    // }
                  },
                  () => {
                    // Error or render dialog closed without being successful
                  }
                );
              },
              () => {
                this.toastr.error('Error in the configuration the PayPal');
                // Error in configuration
              }
            );
        },
        () => {
          this.toastr.error('Paypal initialization failed');
          // Error in initialization, maybe PayPal isn't supported or something else
        }
      );
  }
}
