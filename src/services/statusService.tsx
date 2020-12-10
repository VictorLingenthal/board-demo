
export default class StatusService implements IStatusService {

  public statusTypes:CardStatus[]

  constructor() {
    this.statusTypes = [
        {value:'backlog', label:'Backlog'},
        {value:'todo', label:'To Do'},
        {value:'inprogress', label:'In Progress'},
        {value:'resolved', label:'Resolved'},
        {value:'won\'t fix', label:'Won\'t Fix'}
    ]
  }

  public getStatusByValue = (value:CardStatusValue):CardStatus =>
    this.statusTypes.filter(i => i.value === value)[0]

}
