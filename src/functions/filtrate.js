export const filtrate = (requests, filter) => {
    return requests.filter(function (el) {
            return ((el.from === filter.from) || filter.from === null)  &&
                   ((el.to === filter.to) || filter.to === null) &&
                   (filter.dateFrom === null || (el.dateFrom.getTime() >= filter.dateFrom.getTime())) &&
                   (filter.dateTo === null || (el.dateTo.getTime() <= filter.dateTo.getTime()));
          });
}


