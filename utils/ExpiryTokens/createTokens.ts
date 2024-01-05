
const { Unkey }  = require('@unkey/api');
export const generateKey = async(remaining :number, limit: number)=>{
    const unkey = new Unkey({ token: 'unkey_3ZGdbjpZJntaJzSUeiZ6VAWz' });
    try {
        const created = await unkey.keys?.create({
            apiId:"api_5r1wEJKMCFPPVJP2AuKBqk",
            prefix:"xyz",
            byteLength:16,
            ownerId:"sandyy",
            meta:{
                hello: "world"
            },
            expires: 168694196647111,
            ratelimit:{
                type:"fast",
                limit: limit,
                refillRate: 100,
                refillInterval: 1000
            },
            remaining: remaining
        })
        
        console.log(created)
        return {key:created};
    } catch (error) {
        console.log("error occured while generating trial key")
        return { error: error};
    }
}