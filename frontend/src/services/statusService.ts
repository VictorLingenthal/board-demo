
export type CardStatusValue = 'backlog' | 'todo' | 'inprogress' | 'resolved' | 'won\'t fix'
type CardStatusLabel = 'Backlog' | 'To Do' | 'In Progress' | 'Resolved' | 'Won\'t Fix'

export type CardStatus = {
  value: CardStatusValue
  label: CardStatusLabel
}

export interface IStatusService {
  statusTypes: CardStatus[]
  getStatusByValue(value:CardStatusValue):CardStatus
}

export default class StatusService implements IStatusService {

  private static instance: StatusService;
  public statusTypes:CardStatus[]

  private constructor() {
    this.statusTypes = [
        {value:'backlog', label:'Backlog'},
        {value:'todo', label:'To Do'},
        {value:'inprogress', label:'In Progress'},
        {value:'resolved', label:'Resolved'},
        {value:'won\'t fix', label:'Won\'t Fix'}
    ]
  }

  public static getInstance(): StatusService {
      if (!StatusService.instance)
          StatusService.instance = new StatusService();

      return StatusService.instance;
  }

  public getStatusByValue = (value:CardStatusValue):CardStatus =>
    this.statusTypes.filter(i => i.value === value)[0]

}
