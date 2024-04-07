import { Button } from "frames.js/next";
import { frames } from "./frames";
import { track } from '@vercel/analytics/server';
import axios from "axios";

const handleRequest = frames(async (ctx) => {

    const GT = ">>>"
;
    const regularFontData = fetch(new URL('https://govcaster.s3.us-east-2.amazonaws.com/BroniceRegular.ttf')).then((res) => res.arrayBuffer());
    const boldFontData = fetch(new URL('https://govcaster.s3.us-east-2.amazonaws.com/BroniceBold.ttf')).then((res) => res.arrayBuffer());
    
    const regularFont = await Promise.all([regularFontData]);
    const boldFont = await Promise.all([boldFontData]);
    
    const fonts: any = [
      {
        name: 'Bronice',
        data: regularFont[0],
        weight: 400
      },
      {
        name: 'Bronice',
        data: boldFont[0],
        weight: 700        
      }
    ]

    const { proposalId } = ctx.searchParams;
    
    const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_SITE_URL}/api/proposal?proposalId=${proposalId}`,
    );

    const { title, chain, dao, imageUrls, primaryColor } = data;
    
    return {
      imageOptions: {
        fonts: fonts
      },
      image: (
        <div style={{'display': 'flex', 'flexDirection': 'column', 'height': '100%', 'width': '100%', 'justifyContent': 'center'}}>
          <div style={{'display': 'flex', 'flexDirection': 'row', 'height': '50%', 'width': '100%', 'justifyContent': 'center'}}>
            {
              imageUrls.slice(0, 3).map((url: any, index: any) => (
                <div key={index} style={{'backgroundImage': `url(${url})`, 'backgroundSize': 'cover', 
                'backgroundRepeat': 'no-repeat', 'backgroundPosition': 'center', 'height': '100%', 'width': '33.33%'}}></div>
              ))
            }
          </div>
          <div style={{'display': 'flex', 'flexDirection': 'row', 'height': '50%', 'width': '100%', 'justifyContent': 'center'}}>
            {
              imageUrls.slice(3, 6).map((url: any, index: any) => (
                <div key={index} style={{'backgroundImage': `url(${url})`, 'backgroundSize': 'cover', 
                'backgroundRepeat': 'no-repeat', 'backgroundPosition': 'center', 'height': '100%', 'width': '33.33%'}}></div>
              ))
            }
          </div>
          <div style={{'position': 'absolute', 'zIndex': '100', 'height': '100%', 'width': '100%', 'display': 'flex', 'flexDirection': 'column', 'justifyContent': 'center', 'background': 'rgba(0, 0, 0, 0.7)',  'padding': '20px', 'color': 'white', 'fontWeight': 'bold'}}>
            <div style={{'display': 'flex', 'padding': '20px', 'fontSize': '40px', 'fontWeight': 700, 'width': '100%', 'height': '50%', 'alignItems': 'flex-end'}}>
              <p style={{'margin': 0}}>NEW<span style={{'color': primaryColor, 'marginLeft': '8px', 'marginRight': '8px'}}>{dao.toUpperCase()}</span>&nbsp;PROPOSAL</p>
            </div>            
            
            <div style={{'width': '100%', 'padding': '20px', 'marginTop': '-40px', 'height': '50%', 'display': 'flex', 'flexDirection': 'row', 'justifyContent': 'center', 'alignItems': 'center'}}>
              <div style={{'display': 'flex', 'color': 'rgba(255, 255, 255, 0.8)',  'fontSize': '20px', 'fontWeight': 400, 'width': '50%', 'height': '100%', 'alignItems': 'center'}}>
                <p style={{'margin': 0}}>{title}</p>
              </div>
              <div style={{'display': 'flex', 'padding': '20px', 'fontWeight': 400, 'width': '50%', 'height': '100%', 'alignItems': 'center', 'justifyContent': 'flex-end'}}>
                <p style={{'margin': 0}}>READ {GT}</p>
              </div>
            </div>
          </div>
        </div>
      ),
      buttons: [
          <Button action="post" target={`${process.env.NEXT_PUBLIC_SITE_URL}/frames/lore?chain=${chain}&proposalId=${proposalId}&id=0`}>
          Read Lore ✨
          </Button>,
          <Button action="link" target={`https://app.realms.today/dao/${dao}/proposal/${proposalId}`}>
          Vote Now
          </Button>
      ],
    };
});

export const GET = handleRequest;
export const POST = handleRequest;
