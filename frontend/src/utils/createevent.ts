/**
 * Creates a new event that allows subscribers to add and remove event handlers.
 * @return {function}
 * @property {function(handler: function)} add Add a new event handler.
 * @property {function(handler: function)} remove Remove an event handler.
 */
export default function createEvent() {
  let invokeList:any[] = [];

  const event = (...args:any[]) => {
    for (const e of invokeList) {
      e(...args);
    }
  };

  event.add = (e:any) => {
    invokeList = [...invokeList, e];
  };

  event.remove = (e:any) => {
    invokeList = invokeList.filter(c => c !== e);
  };

  return event;
}
