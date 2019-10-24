function import() {
  var source = SpreadsheetApp.openById("1_jGvMw187Ra6imM6V4hE9xaQ7qB4q-Is96O1EeowawA");
  var sheet = source.getSheetByName("school-roster-SIS-Network.csv");
  var data = sheet.getRange("A:V").getValues();
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var roster = ss.getSheetByName("MASTER ROSTER");
  var datalen = data.length + 1;
  roster.getRange("A2:V").clear();
  roster.getRange("A2:V" + datalen).setValues(data);
  
  var emailsource = SpreadsheetApp.openById("1YfAsp2UNPNAnrMIRLZIrj01rlSFsaX9ZpYavNKW-qic");
  var emailsheet = emailsource.getSheetByName("student-emails-Network.csv");
  var emaildata = emailsheet.getRange("A:G").getValues();
  var emaildest = ss.getSheetByName("Emails");
  emaildest.getRange("A:G").clear();
  emaildest.getRange("A1:G" + emaildata.length).setValues(emaildata);

}

function export() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var resources = ss.getSheetByName("Resources"); //get to sheet with schools & urls of each dashboard
  var data = ss.getSheetByName("MASTER ROSTER").getRange("A:DB").getValues(); //get all the data from the master roster
  var unitTest = ss.getSheetByName("UnitTests").getRange("A:N").getValues(); // get all unit test data
  var ASAdata = [data[0],data[1]]; // will hold data specifically for each school, already includes two rows of headers
  var GWCdata = [data[0],data[1]]; 
  var CBRdata = [data[0],data[1]]; 
  var LCAdata = [data[0],data[1]]; 
  var RCAdata = [data[0],data[1]];
  var OAdata = [data[0],data[1]];
  var networkData = [data[0],data[1]];
  var additionalData = ss.getSheetByName("Other Data Points").getRange("A:W").getValues(); //get all the data from the "additional data" tab
  var bigData = [];
    var allUrl = [];
  var network = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1pluVwSRkUzJbveaLL1f_4iiSjLOtdWOkxGXzA7-Rzpk/edit#gid=0");
  var networkUnits = network.getSheetByName("UnitTests");
  networkUnits.getRange("A:N").clear();
  networkUnits.getRange("A1:N"+unitTest.length).setValues(unitTest);
  
  
  for (var i = 2; i < data.length; i++) { //iterate through the data and add the school specific data to the appropriate array
   if(data[i][1] == "ASA") {
        ASAdata.push(data[i]);
        networkData.push(data[i]);
    } else if (data[i][1] == "CBR") {
        CBRdata.push(data[i]);
        networkData.push(data[i]);
    } else if (data[i][1] == "GWC") {
        GWCdata.push(data[i]);
        networkData.push(data[i]);
    } else if (data[i][1] == "LCA") {
        LCAdata.push(data[i]);
        networkData.push(data[i]);
    } else if (data[i][1] == "RCA") {
        RCAdata.push(data[i]);
        networkData.push(data[i]);
    } else if (data[i][1] == "OA") {
        OAdata.push(data[i]);
        networkData.push(data[i]);
    }
  }
  
  
  var networkTab = network.getSheetByName("Master Roster Import");
  networkTab.getRange("A:DB").clear();
  networkTab.getRange("A1:DB" + networkData.length).setValues(networkData);
  
  bigData.push(ASAdata); //pushes the data into a bigger array
  bigData.push(CBRdata);
  bigData.push(GWCdata);
  bigData.push(LCAdata);
  bigData.push(RCAdata);
  bigData.push(OAdata);
  
  for (var x = 3; x < 9; x++) {
     allUrl.push(resources.getRange(2,x).getValue()); //gets all the URLs of the sl dashboards
  }

  for (x = 0; x < allUrl.length; x++) {
      var destination = SpreadsheetApp.openByUrl(allUrl[x]); //opens sheet based on url for each url in array
      var destinationTab = destination.getSheetByName("Master Roster Import"); //opens master roster import tab
      destinationTab.getRange("A:DB").clear(); //clears master roster imprt tab
      destinationTab.getRange("A1:DB" + (bigData[x].length)).setValues(bigData[x]); //sets values based on array
      
      var additionalTab = destination.getSheetByName("Additional Data Import");
      additionalTab.getRange("A:W").clear();
      additionalTab.getRange("A1:W" + additionalData.length).setValues(additionalData); //set values
      
      var unitTestTab = destination.getSheetByName("UnitTests");
      unitTestTab.getRange("A:N").clear();
      unitTestTab.getRange("A1:N"+unitTest.length).setValues(unitTest);
  }
}
