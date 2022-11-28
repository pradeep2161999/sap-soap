'use strict';

const soap = require('soap');
//const wsdlUrl = "http://www.chemspider.com/MassSpecAPI.asmx?WSDL";
const url =
  'http://203.223.190.171:8011/sap/bc/srt/wsdl/flv_10002A111AD1/srvc_url/vendor_portal?sap-client=800';

/*
// NANDHSH Nandhu@123
// passing in overridePromiseSuffix because some of the endpoints end
// with "Async" which breaks promisify.
const security = new soap.BasicAuthSecurity("NANDHSH", "Nandhu@123");

const wsdl_headers = {};
security.addHeaders(wsdl_headers);
soap
  .createClientAsync(wsdlUrl, {
    overridePromiseSuffix: "Promise",
  })
  .then((client) => {
    client.setSecurity(security);
    client.GetDatabasesPromise({}).then((results) => {
      // results is an array with only one item which then has an array called "string".
      console.log(results[0].GetDatabasesResult.string);
      const databases = results[0].GetDatabasesResult.string;

      // normally we would do some sort of processing or something.
      //console.dir(databases);
    });
  });
*/
var auth =
  'Basic ' + new Buffer('NANDHSH' + ':' + 'Nandhu@123').toString('base64');

const wsdl_headers = { Authorization: auth };
soap.createClient(url, { wsdl_headers }, function (err, client) {
  console.log(err);
  client.addHttpHeader('Authorization', auth);
  //client.addHeaders(wsdl_headers);

  client.ZMM_RFC_VENDOR_DETAILS({ item: [{ vendor: '' }] }, (er, result) => {
    console.log('---ZMM_RFC_PO_DETAILS-- callback');
    console.log(er);

    console.log(result.ET_USER_INFO);
  });

  const params = { IV_VENDOR: '6000101' };

  client.ZMM_RFC_PO_DETAILS(
    params,
    { item: [{ PO_NUMBER: '' }, { PO_DATE: '' }, { PLANT: '' }] },
    (er, result) => {
      console.log('---ZMM_RFC_PO_DETAILS-- callback');
      console.log(er);

      console.log(result.ET_OPEN_PO_ITEM);
    }
  );
});
