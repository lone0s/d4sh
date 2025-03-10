import { getApiDocs } from "@/app/lib/swagger";
import ReactSwagger from './reactSwagger';


export default async function IndexPage(){

    const spec = await getApiDocs();
    return(
        <section className="container">
            <ReactSwagger spec={spec}/>
        </section>
    );
}