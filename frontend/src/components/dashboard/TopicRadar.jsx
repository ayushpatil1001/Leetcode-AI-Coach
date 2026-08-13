import {

RadarChart,
Radar,
PolarGrid,
PolarAngleAxis,
PolarRadiusAxis,
ResponsiveContainer

}
from "recharts";

export default function TopicRadar({

dashboard

}){

const topics=

dashboard.topicStats ||

[

{

subject:"Array",

A:80

},

{

subject:"Graph",

A:60

},

{

subject:"Tree",

A:70

},

{

subject:"DP",

A:40

},

{

subject:"Greedy",

A:55

},

{

subject:"Math",

A:50

}

];

return(

<div
className="
bg-white
rounded-3xl
shadow-xl
p-8
h-[420px]
"
>

<h2 className="text-3xl font-bold">

Topic Strength

</h2>

<div className="h-[300px] mt-6">

<ResponsiveContainer>

<RadarChart data={topics}>

<PolarGrid/>

<PolarAngleAxis

dataKey="subject"

/>

<PolarRadiusAxis/>

<Radar

dataKey="A"

stroke="#0ea5e9"

fill="#38bdf8"

fillOpacity={0.6}

/>

</RadarChart>

</ResponsiveContainer>

</div>

</div>

);

}