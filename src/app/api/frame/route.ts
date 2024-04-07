import { NextRequest, NextResponse } from "next/server";
import { createClient } from '@supabase/supabase-js';
import OpenAI from "openai";


const LANGUAGE_SYSTEM_PROMPT = "You are an expert storyteller responsible for turning Web 3.0 governance proposals into digestible, engaging, and funny short stories for users to read on social media. You will be given a proposal and your job is to first, understand the proposal and what effect it will have. Then you must generate a short story (no more than 30 sentences). Your story should not contain any line breaks, but it should have a clear connection to the governance proposal you are given. Feel free to be as wild and fantastical as you desire. The story should be less than 200 words. It must NOT exceed one paragraph.";

export async function POST(request: NextRequest): Promise<NextResponse> {

    // TO DO: Implement the POST method to generate a story based on the proposal ID
    return NextResponse.json({ error: 'Not implemented' }, { status: 501 });
}

export async function GET(request: NextRequest): Promise<NextResponse> {

    const proposalId = request.nextUrl.searchParams.get('proposalId');
    const chain = request.nextUrl.searchParams.get('chain') || 'Solana';
    const id = parseInt(request.nextUrl.searchParams.get('id') || '');
    
    if (proposalId === null) return NextResponse.json({ error: 'No proposal ID provided' }, { status: 400 });
    if (chain === null) return NextResponse.json({ error: 'No chain provided' }, { status: 400 });
    if (id === null) return NextResponse.json({ error: 'No id provided' }, { status: 400 });

    const supabaseUrl = process.env.SUPABASE_URL || '';
    const supabaseKey = process.env.SUPABASE_SECRET_KEY || '';
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { data, error } = await supabase.from('proposals').select('*').eq('Chain', chain).eq('Proposal', proposalId);
    if (data === null) return NextResponse.json({ error: error }, { status: 500 });

    let frames = data[0]['frames'];
    let next: any = id + 1;
    if (next >= frames.length) next = null;
    
    let frame = frames[id];
    let sentence = frame['sentence'];
    let imageUrl = frame['imageURL'];
    
    return NextResponse.json({
        'imageUrl': imageUrl,
        'sentence': sentence,
        'next': next,
        'n_sentences': frames.length,
        'chain': chain,
        'dao': data[0]['DAO']
    })
}
