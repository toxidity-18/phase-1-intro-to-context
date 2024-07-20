const createEmployeeRecord = function(arr) {
    return {
      firstName: arr[0],
      familyName: arr[1],
      title: arr[2],
      payPerHour: arr[3],
      timeInEvents: [],
      timeOutEvents: []
    }
  }
  
  const createEmployeeRecords = function(arr) {
    return arr.map(createEmployeeRecord)
  }
  
  const createTimeInEvent = function(employee, dateTime) {
    let [date, hour] = dateTime.split(' ')
    employee.timeInEvents.push({ type: "TimeIn", date, hour: parseInt(hour, 10) })
    return employee
  }
  
  const createTimeOutEvent = function(employee, dateTime) {
    let [date, hour] = dateTime.split(' ')
    employee.timeOutEvents.push({ type: "TimeOut", date, hour: parseInt(hour, 10) })
    return employee
  }
  
  const hoursWorkedOnDate = function(employee, date) {
    let inEvent = employee.timeInEvents.find(event => event.date === date)
    let outEvent = employee.timeOutEvents.find(event => event.date === date)
    return (outEvent.hour - inEvent.hour) / 100
  }
  
  const wagesEarnedOnDate = function(employee, date) {
    return hoursWorkedOnDate(employee, date) * employee.payPerHour
  }
  
  const allWagesFor = function(employee) {
    let dates = employee.timeInEvents.map(event => event.date)
    return dates.reduce((total, date) => total + wagesEarnedOnDate(employee, date), 0)
  }
  
  const calculatePayroll = function(employees) {
    return employees.reduce((total, employee) => total + allWagesFor(employee), 0)
  }
  
  // Unit tests
  const chai = require('chai');
  const expect = chai.expect;
  
  describe("The payroll system", function () {
    describe("populates a record from an Array", function () {
      it("has a function called createEmployeeRecord", function () {
        expect(createEmployeeRecord).to.exist
      })
  
      describe("createEmployeeRecord", function () {
        it("populates a firstName field from the 0th element", function () {
          let testEmployee = createEmployeeRecord(["Gray", "Worm", "Security", 1])
          expect(testEmployee.firstName).to.eq("Gray")
        })
  
        it("populates a familyName field from the 1th element", function () {
          let testEmployee = createEmployeeRecord(["Gray", "Worm", "Security", 1])
          expect(testEmployee.familyName).to.eq("Worm")
        })
  
        it("populates a title field from the 2th element", function () {
          let testEmployee = createEmployeeRecord(["Gray", "Worm", "Security", 1])
          expect(testEmployee.title).to.eq("Security")
        })
  
        it("populates a payPerHour field from the 3th element", function () {
          let testEmployee = createEmployeeRecord(["Gray", "Worm", "Security", 1])
          expect(testEmployee.payPerHour).to.eq(1)
        })
  
        it("initializes a field, timeInEvents, to hold an empty Array", function () {
          let testEmployee = createEmployeeRecord(["Gray", "Worm", "Security", 1])
          expect(testEmployee.timeInEvents).to.eql([])
        })
  
        it("initializes a field, timeOutEvents, to hold an empty Array", function () {
          let testEmployee = createEmployeeRecord(["Gray", "Worm", "Security", 1])
          expect(testEmployee.timeOutEvents).to.eql([])
        })
      })
    })
  
    describe("process an Array of Arrays into an Array of employee records", function () {
      it("has a function called createEmployeeRecords", function () {
        expect(createEmployeeRecords).to.exist
      })
  
      describe("createEmployeeRecords", function () {
        let employeeRecords;
  
        let twoRows = [
          ["moe", "sizlak", "barkeep", 2],
          ["bartholomew", "simpson", "scamp", 3]
        ]
  
        it("creates two records", function () {
          let employeeRecords = createEmployeeRecords(twoRows)
          expect(employeeRecords.length).to.equal(2)
        })
  
        it("correctly assigns the first names", function () {
          let employeeRecords = createEmployeeRecords(twoRows)
          let nameExtractor = function (e) { return e.firstName }
          expect(employeeRecords.map(nameExtractor)).to.eql(["moe", "bartholomew"]);
        })
  
        it("creates more than 2 records", function() {
          let dataEmployees = [
            ["Thor", "Odinsson", "Electrical Engineer", 45],
            ["Loki", "Laufeysson-Odinsson", "HR Representative", 35],
            ["Natalia", "Romanov", "CEO", 150],
            ["Darcey", "Lewis", "Intern", 15],
            ["Jarvis", "Stark", "CIO", 125],
            ["Anthony", "Stark", "Angel Investor", 300],
            ["Byron", "Poodle", "Mascot", 3],
            ["Julius", "Caesar", "General", 27],
            ["Rafiki", "", "Aide", 10],
            ["Simba", "", "King", 100]
          ]
          let employeeRecords = createEmployeeRecords(dataEmployees)
          expect(employeeRecords.length).to.equal(10)
          expect(employeeRecords[0].firstName).to.equal(dataEmployees[0][0])
          expect(employeeRecords[9].firstName).to.equal(dataEmployees[9][0])
        })
      })
    })
  
    describe("it adds a timeIn event Object to an employee's record of timeInEvents when provided an employee record and Date/Time String and returns the updated record", function () {
  
      it("has a function called createTimeInEvent", function () {
        expect(createTimeInEvent).to.exist
      })
  
      describe("createTimeInEvent", function () {
        let bpRecord, updatedBpRecord, newEvent
  
        it("creates the correct type", function () {
          let bpRecord = createEmployeeRecord(["Byron", "Poodle", "Mascot", 3])
          let updatedBpRecord = createTimeInEvent(bpRecord, "2014-02-28 1400")
          let newEvent = updatedBpRecord.timeInEvents[0]
          expect(newEvent.type).to.equal("TimeIn")
        })
  
        it("extracts the correct date", function () {
          let bpRecord = createEmployeeRecord(["Byron", "Poodle", "Mascot", 3])
          let updatedBpRecord = createTimeInEvent(bpRecord, "2014-02-28 1400")
          let newEvent = updatedBpRecord.timeInEvents[0]
          expect(newEvent.date).to.eq("2014-02-28");
        })
  
        it("extracts the correct hour", function () {
          let bpRecord = createEmployeeRecord(["Byron", "Poodle", "Mascot", 3])
          let updatedBpRecord = createTimeInEvent(bpRecord, "2014-02-28 1400")
          let newEvent = updatedBpRecord.timeInEvents[0]
          expect(newEvent.hour).to.eq(1400);
        })
      })
    })
  
    describe("it adds a timeOut event Object to an employee's record of timeOutEvents when provided an employee record and Date/Time String and returns the updated record", function () {
  
      it("has a function called createTimeOutEvent", function () {
        expect(createTimeOutEvent).to.exist
      })
  
      describe("createTimeOutEvent", function () {
        let bpRecord, updatedBpRecord, newEvent
  
        it("creates the correct type", function () {
          let bpRecord = createEmployeeRecord(["Byron", "Poodle", "Mascot", 3])
          let updatedBpRecord = createTimeOutEvent(bpRecord, "2015-02-28 1700")
          let newEvent = updatedBpRecord.timeOutEvents[0]
          expect(newEvent.type).to.equal("TimeOut")
        })
  
        it("extracts the correct date", function () {
          let bpRecord = createEmployeeRecord(["Byron", "Poodle", "Mascot", 3])
          let updatedBpRecord = createTimeOutEvent(bpRecord, "2015-02-28 1700")
          let newEvent = updatedBpRecord.timeOutEvents[0]
          expect(newEvent.date).to.eq("2015-02-28");
        })
  
        it("extracts the correct hour", function () {
          let bpRecord = createEmployeeRecord(["Byron", "Poodle", "Mascot", 3])
          let updatedBpRecord = createTimeOutEvent(bpRecord, "2015-02-28 1700")
          let newEvent = updatedBpRecord.timeOutEvents[0]
          expect(newEvent.hour).to.eq(1700);
        })
      })
    })
  
    describe("Given an employee record with a date-matched timeInEvent and timeOutEvent", function () {
  
      it("hoursWorkedOnDate calculates the hours worked when given an employee record and a date", function () {
        expect(hoursWorkedOnDate).to.exist
      })
  
      describe("hoursWorkedOnDate", function () {
        it("calculates that the employee worked 2 hours", function () {
          cRecord = createEmployeeRecord(["Julius", "Caesar", "General", 1000])
          updatedBpRecord = createTimeInEvent(cRecord, "44-03-15 0900")
          updatedBpRecord = createTimeOutEvent(cRecord, "44-03-15 1100")
          expect(hoursWorkedOnDate(cRecord, "44-03-15")).to.equal(2)
        })
  
        it("calculates that the employee worked 8 hours", function () {
          cRecord = createEmployeeRecord(["Julius", "Caesar", "General", 1000])
          updatedBpRecord = createTimeInEvent(cRecord, "44-03-15 0900")
          updatedBpRecord = createTimeOutEvent(cRecord, "44-03-15 1700")
          expect(hoursWorkedOnDate(cRecord, "44-03-15")).to.equal(8)
        })
      })
    })
  
    describe("Given an employee record with a date-matched timeInEvent and timeOutEvent", function () {
  
      it("wagesEarnedOnDate multiplies the hours worked by the employee's rate per hour", function () {
        expect(wagesEarnedOnDate).to.exist
      })
  
      describe("wagesEarnedOnDate", function () {
        it("wagesEarnedOnDate multiplies hours by payPerHour", function () {
          expect(wagesEarnedOnDate(cRecord, "44-03-15")).to.equal(8000)
        })
  
        it("works when the employee is paid 27 per hour", function() {
          cRecord = createEmployeeRecord(["Byron", "Poodle", "Mascot", 3])
          updatedBpRecord = createTimeInEvent(cRecord, "2015-02-28 1400")
          updatedBpRecord = createTimeOutEvent(cRecord, "2015-02-28 1700")
          expect(wagesEarnedOnDate(cRecord, "2015-02-28")).to.equal(9)
        })
      })
    })
  
    describe("Given an employee record with MULTIPLE date-matched timeInEvent and timeOutEvent", function () {
  
      it("allWagesFor aggregates all the dates' wages and adds them together", function () {
        expect(allWagesFor).to.exist
      })
  
      describe("allWagesFor", function () {
        it("calculates that the employee earned 27 dollars", function () {
          expect(allWagesFor(cRecord)).to.equal(27)
        })
  
        it("calculates that the employee earned 54 dollars", function() {
          cRecord = createEmployeeRecord(["Byron", "Poodle", "Mascot", 3])
          cRecord = createTimeInEvent(cRecord, "2015-02-28 1400")
          cRecord = createTimeOutEvent(cRecord, "2015-02-28 1700")
          cRecord = createTimeInEvent(cRecord, "2015-03-01 1400")
          cRecord = createTimeOutEvent(cRecord, "2015-03-01 1700")
          expect(allWagesFor(cRecord)).to.equal(18)
        })
      })
    })
  
    describe("Given an array of multiple employees", function () {
      it("calculatePayroll aggregates all the dates' wages and adds them together", function () {
        expect(calculatePayroll).to.exist
      })
  
      describe("calculatePayroll", function () {
        it("calculates payroll", function () {
          expect(calculatePayroll([cRecord])).to.equal(18)
        })
  
        it("calculates payroll for longer arrays", function () {
          cRecord = createEmployeeRecord(["Byron", "Poodle", "Mascot", 3])
          cRecord = createTimeInEvent(cRecord, "2015-02-28 1400")
          cRecord = createTimeOutEvent(cRecord, "2015-02-28 1700")
          cRecord = createTimeInEvent(cRecord, "2015-03-01 1400")
          cRecord = createTimeOutEvent(cRecord, "2015-03-01 1700")
          cRecord2 = createEmployeeRecord(["Mo", "Fo", "Manager", 10])
          cRecord2 = createTimeInEvent(cRecord2, "2015-02-28 0900")
          cRecord2 = createTimeOutEvent(cRecord2, "2015-02-28 1700")
          cRecord2 = createTimeInEvent(cRecord2, "2015-03-01 0900")
          cRecord2 = createTimeOutEvent(cRecord2, "2015-03-01 1700")
          expect(calculatePayroll([cRecord, cRecord2])).to.equal(134)
        })
      })
    })
  })
  