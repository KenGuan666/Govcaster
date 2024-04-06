import { Button } from "frames.js/next";
import { frames } from "./frames";
import axios from "axios";

const handleRequest = frames(async (ctx) => {

    const { proposalId } = ctx.searchParams;
    
    const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_SITE_URL}/api/proposal?proposalId=${proposalId}`,
    );

    const { title, chain, dao } = data;

    return {
      image: (
        <div style={{'display': 'flex', 'height': '100%', 'width': '100%', 'background': 'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(17,71,152,1) 35%)', 'padding': '10', 'color': 'white', 'fontWeight': 'bold', 'alignItems': 'center'}}>
          <span style={{'fontWeight': 'bold', 'marginLeft': '20px'}}>{title}</span>
        </div>
      ),
      buttons: [
          <Button action="post" target={`${process.env.NEXT_PUBLIC_SITE_URL}/frames/lore?chain=${chain}&proposalId=${proposalId}&id=0`}>
          Read Lore
          </Button>,
          <Button action="link" target={`https://app.realms.today/dao/${dao}/proposal/${proposalId}`}>
          Vote Now
          </Button>
      ],
    };
});
 
export const GET = handleRequest;
export const POST = handleRequest;