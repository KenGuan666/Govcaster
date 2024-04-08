import { Button } from "frames.js/next";
import { frames } from "../frames";
import axios from "axios";

const handleRequest = frames(async (ctx) => {

    const regularFontData = fetch(new URL('https://govcaster.s3.us-east-2.amazonaws.com/BroniceRegular.ttf')).then((res) => res.arrayBuffer());
    const boldFontData = fetch(new URL('https://govcaster.s3.us-east-2.amazonaws.com/BroniceBold.ttf')).then((res) => res.arrayBuffer());
    const spectralFontData = fetch(new URL('https://govcaster.s3.us-east-2.amazonaws.com/Spectral-Regular.ttf')).then((res) => res.arrayBuffer());

    const regularFont = await Promise.all([regularFontData]);
    const boldFont = await Promise.all([boldFontData]);
    const spectralFont = await Promise.all([spectralFontData]);
    
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
      },
      {
        name: 'Spectral',
        data: spectralFont[0],
        weight: 300
      }
    ]

    const { chain, proposalId, id } = ctx.searchParams;
    const intId = parseInt(id);

    const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_SITE_URL}/api/frame?chain=${chain}&proposalId=${proposalId}&id=${intId}`,
    );
    
    const { imageUrl, sentence, next, n_sentences, dao } = data;

    return {
        imageOptions: {
            fonts: fonts
        },
        image: (
            <div style={{'display': 'flex', 'flexDirection': 'column', 'height': '100%', 'width': '100%', 'justifyContent': 'center'}}>
                <div style={{'display': 'flex', 'flexDirection': 'column', 'height': '100%', 'width': '100%', 'backgroundImage': `url(${imageUrl})`, 'backgroundSize': 'contain', 'backgroundRepeat': 'no-repeat', 'backgroundPosition': 'center', 'color': 'white', 'fontWeight': 'bold', 'justifyContent': 'center'}}>
                </div>
                <div style={{'position': 'absolute', 'zIndex': '100', 'height': '100%', 'width': '100%', 'display': 'flex', 'flexDirection': 'column', 'justifyContent': 'flex-end', 'padding': '60px', 'background': 'rgba(0, 0, 0, 0.7)', 'color': 'white', 'fontWeight': 'bold'}}>
                    <span style={{'fontWeight': 700}}>{intId+1}<span style={{'color': 'rgba(255, 255, 255, 0.4)'}}>/{n_sentences}</span></span>
                    <span style={{'fontWeight': 300, 'fontSize': '20px'}}>{sentence}</span>
                </div>
            </div>
        ),
        buttons: [
            intId == 0 ? <Button action="post" target={`${process.env.NEXT_PUBLIC_SITE_URL}/frames?proposalId=${proposalId}`}>← Previous</Button> : <Button action="post" target={`${process.env.NEXT_PUBLIC_SITE_URL}/frames/lore?chain=${chain}&proposalId=${proposalId}&id=${intId-1}`}>← Previous</Button>,
            next == null ? <Button action="post" target={`${process.env.NEXT_PUBLIC_SITE_URL}/frames/end?proposalId=${proposalId}`}>Finish →</Button> : <Button action="post" target={`${process.env.NEXT_PUBLIC_SITE_URL}/frames/lore?chain=${chain}&proposalId=${proposalId}&id=${next}`}>Next →</Button>
        ],
    };
});
 
export const GET = handleRequest;
export const POST = handleRequest;