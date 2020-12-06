
export const send_command = (command, processResults)=> {
    const cmd = make_graphQL_command(command);
    const request = new XMLHttpRequest();
    const base_url="https://pu65bkndtvahlfy5nvhs5vzuhq.appsync-api.us-west-2.amazonaws.com/graphql";
    const gql_key="da2-scoukebkyzcbrd5mwc7zswe7bm";
    request.open("POST", base_url);
    request.setRequestHeader("Content-Type","application/graphql");
    request.setRequestHeader("x-api-key",gql_key);
    request.send(cmd);

    request.onreadystatechange = function() {
        if (this.readyState == 4) {
            var arr = JSON.parse(this.responseText).data.getRedis;
            console.log(arr);
            var clean_arr = arr.slice(0,arr.length-1);
            console.log(clean_arr);
            processResults(clean_arr);
        }
    };
}

function make_graphQL_command(txtVal){
    var innerStr = "query { getRedis(Command: ##token## ) }";
    var res = txtVal.split(" ");
    var innerObj = JSON.stringify(innerStr.replace("##token##",JSON.stringify(res)));
    var mtstr = '{ "query" : ##token## }'
    mtstr = mtstr.replace("##token##",innerObj);
    return mtstr;
}