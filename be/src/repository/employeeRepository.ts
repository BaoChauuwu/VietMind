import { Employee, EmployeeModel } from '../models/employeeModel.js';

export class EmployeeRepository {
  async findAll(): Promise<Employee[]> {
    const documents = await EmployeeModel.find().lean().exec();
    return documents.map((document) => new Employee(document));
  }
}
