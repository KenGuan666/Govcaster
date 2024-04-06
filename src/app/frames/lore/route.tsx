import { Button } from "frames.js/next";
import { frames } from "../frames";
import axios from "axios";

const handleRequest = frames(async (ctx) => {

    const { chain, proposalId, id } = ctx.searchParams;
    const intId = parseInt(id);

    const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_SITE_URL}/api/frame?chain=${chain}&proposalId=${proposalId}&id=${intId}`,
    );
    
    const { imageUrl, sentence, next, n_sentences, dao } = data;

    return {
    image: (
        <div style={{'display': 'flex', 'flexDirection': 'column', 'height': '100%', 'width': '100%', 'backgroundImage': `url(${imageUrl})`, 'backgroundSize': 'cover', 'backgroundPosition': 'center', 'color': 'white', 'fontWeight': 'bold', 'justifyContent': 'center'}}>
          <span style={{'fontWeight': 'bold', 'background': 'rgba(0, 0, 0, 0.7)', 'padding': '20px', 'width': '100%', 'display': 'flex', 'flexDirection': 'column'}}>
            <p style={{'margin': 0}}>{sentence}</p>
            <p style={{'margin': 0, 'marginTop': '8px', 'fontSize': '20px'}}>({intId+1} of {n_sentences})</p>
        </span>
        </div>
    ),
    buttons: [
        intId > 0 && <Button action="post" target={`${process.env.NEXT_PUBLIC_SITE_URL}/frames/lore?chain=${chain}&proposalId=${proposalId}&id=${intId-1}`}>Previous</Button>,
        next == null ? <Button action="link" target={`https://app.realms.today/dao/${dao}/proposal/${proposalId}`}>Vote Now</Button> : <Button action="post" target={`${process.env.NEXT_PUBLIC_SITE_URL}/frames/lore?chain=${chain}&proposalId=${proposalId}&id=${next}`}>Next</Button>
    ],
    };
});
 
export const GET = handleRequest;
export const POST = handleRequest;