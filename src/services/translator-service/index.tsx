import fetch from "@/common/request";

const Service = "translate";
const TranslatorService = {
    TranslateText: async (text: string) => {
        try {
            let res: any = await fetch({
                endpoint: `/${Service}`,
                method: 'POST',
                data: {text},
            });
            return res;
        } catch (err) {
            console.log(err);
        }
    }
}

export default TranslatorService;