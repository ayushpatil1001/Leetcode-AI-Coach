import {

PieChart,
Pie,
Cell,
Tooltip,
ResponsiveContainer

}
from "recharts";

export default function DifficultyChart({

dashboard

}){

const data=[

{

name:"Easy",

value:dashboard.profile.easySolved

},

{

name:"Medium",

value:dashboard.profile.mediumSolved

},

{

name:"Hard",

value:dashboard.profile.hardSolved

}

];

const COLORS=[

"#22c55e",

"#f59e0b",

"#ef4444"

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

Problems by Difficulty

</h2>

<div className="h-[300px] mt-6">

<ResponsiveContainer>

<PieChart>

<Pie

data={data}

dataKey="value"

outerRadius={110}

label

>

{

data.map((entry,index)=>(

<Cell

key={index}

fill={COLORS[index]}

/>

))

}

</Pie>

<Tooltip/>

</PieChart>

</ResponsiveContainer>

</div>

</div>

);

}