import fetch from "@/common/request"

const Service = "EventLog";
const EventLogService = {    
    SendAsync: async (data:any) => {    
        let res:any = await fetch({
            url: `/${Service}`,
            method: 'post',
            data
        });
        return res
    }
}
export default EventLogService
