function createEmployeeRecord(employeeArray) {
    return {
      firstName: employeeArray[0],
      familyName: employeeArray[1],
      title: employeeArray[2],
      payPerHour: employeeArray[3],
      timeInEvents: [],
      timeOutEvents: []
    }
  }
  
  function createEmployeeRecords(employeesArray) {
    return employeesArray.map(employeeArray => createEmployeeRecord(employeeArray))
  }
  
  function createTimeInEvent(employee, date) {
    employee.timeInEvents.push(
      {
        type: "TimeIn",
        hour: parseInt(date.split(' ')[1], 10),
        date: date.split(' ')[0]
      }
    )
    return employee
  }
  
  function createTimeOutEvent(employee, date) {
    employee.timeOutEvents.push(
      {
        type: "TimeOut",
        hour: parseInt(date.split(' ')[1], 10),
        date: date.split(' ')[0]
      }
    )
    return employee
  }
  
  function hoursWorkedOnDate(employee, date) {
    let clockIn = employee.timeInEvents.find(d => d.date === date)
    let clockOut = employee.timeOutEvents.find(d => d.date === date)
    return (clockOut.hour - clockIn.hour)/100
  }
  
  function wagesEarnedOnDate(employee, date) {
    return hoursWorkedOnDate(employee, date)*employee.payPerHour
  }
  
  function allWagesFor(employee) {
    let daysWorked = employee.timeInEvents.map(event => event.date)
    let allWagesForEmployee = daysWorked.map(date => wagesEarnedOnDate(employee, date))
    return allWagesForEmployee.reduce((total, wage) => total + wage)
  }
  
  function findEmployeeByFirstName(srcArray, firstName) {
    return srcArray.find(employee => employee.firstName === firstName)
  }
  
  function calculatePayroll(employees) {
    let allWagesForEmployees = employees.map(employee => allWagesFor(employee))
    return allWagesForEmployees.reduce((total, wage) => total + wage)
  }