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

    const { proposalId } = ctx.searchParams;

    const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_SITE_URL}/api/proposal?proposalId=${proposalId}`,
    );
    
    const { mintUrl, n_sentences, chain, dao, imageUrls } = data;
    const int_n_sentences = parseInt(n_sentences);

    return {
        imageOptions: {
            fonts: fonts
        },
        image: (
            <div style={{'display': 'flex', 'flexDirection': 'column', 'height': '100%', 'width': '100%', 'justifyContent': 'center', 'background': 'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(0,175,38,1) 50%)', 'alignItems': 'center'}}>
                <div style={{'position': 'absolute', 'zIndex': '100', 'height': '100%', 'width': '100%', 'display': 'flex', 'flexDirection': 'row', 'justifyContent': 'space-between', 'background': 'rgba(0, 0, 0, 0.7)', 'color': 'white', 'fontWeight': 'bold'}}>
                    <div style={{'display': 'flex', 'flexDirection': 'column', 'width': '40%', 'height': '100%', 'padding': '20px'}}>
                        <div style={{'display': 'flex', 'height': '40%', 'width': '100%', 'justifyContent': 'center', 'flexDirection': 'column'}}>
                            <span style={{'fontWeight': 700, 'fontSize': '40px'}}>THE END</span>
                        </div>
                        <div style={{'display': 'flex', 'padding': '20px', 'height': '60%', 'width': '100%', 'justifyContent': 'center', 'flexDirection': 'column'}}>
                            <span style={{'fontWeight': 400, 'fontSize': '24px', 'color': 'rgba(255, 255, 255, 0.8)'}}>LIKE THE PROPOSAL? VOTE NOW AND MINT THIS STORY.</span>
                        </div>
                    </div>
                    <div style={{'position': 'absolute', 'zIndex': '200', 'right': '0', 'top': '50%', 'transform': 'translateY(-50%)', 'display': 'flex', 'flexDirection': 'column', 'borderRadius': '8px', 'padding': '0 0 0 100px', 'border': '4px solid rgba(255, 255, 255, 0.4)', 'height': '50%', 'width': '60%', 'borderLeft': 'none', 'borderRight': 'none'}}>
                        <div style={{'display': 'flex', 'flexDirection': 'row', 'height': '50%', 'width': '100%', 'justifyContent': 'center'}}>
                            {
                            imageUrls.slice(0, 3).map((url: any, index: any) => (
                                <div key={index} style={{'backgroundImage': `url(${url})`, 'backgroundSize': 'contain', 
                                'backgroundRepeat': 'no-repeat', 'backgroundPosition': 'center', 'height': '100%', 'width': '33.33%'}}></div>
                            ))
                            }
                        </div>
                        <div style={{'display': 'flex', 'flexDirection': 'row', 'height': '50%', 'width': '100%', 'justifyContent': 'center'}}>
                            {
                            imageUrls.slice(3, 6).map((url: any, index: any) => (
                                <div key={index} style={{'backgroundImage': `url(${url})`, 'backgroundSize': 'contain', 
                                'backgroundRepeat': 'no-repeat', 'backgroundPosition': 'center', 'height': '100%', 'width': '33.33%'}}></div>
                            ))
                            }
                        </div>
                    </div>
                    <div style={{'height': '80%', 'position': 'absolute', 'width': '4px', 'background': 'rgba(255, 255, 255, 0.4)', 'right': '51.25%', 'top': '10%', 'zIndex': '400'}}/>
                </div>
            </div>
        ),
        buttons: [
            <Button action="post" target={`${process.env.NEXT_PUBLIC_SITE_URL}/frames/lore?chain=${chain}&proposalId=${proposalId}&id=${int_n_sentences-1}`}>← Previous</Button>,
            <Button action="link" target={`https://app.realms.today/dao/${dao}/proposal/${proposalId}`}>Vote Now</Button>,
            <Button action="link" target={mintUrl}>Mint</Button>
        ],
    };
});
 
export const GET = handleRequest;
export const POST = handleRequest;