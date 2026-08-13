import { motion } from "framer-motion";

export default function AnimatedCard({

    children,

    delay=0

}){

    return(

        <motion.div

            initial={{

                opacity:0,

                y:40

            }}

            whileInView={{

                opacity:1,

                y:0

            }}

            viewport={{

                once:true

            }}

            transition={{

                duration:0.5,

                delay

            }}

            whileHover={{

                y:-8,

                scale:1.02

            }}

        >

            {children}

        </motion.div>

    );

}