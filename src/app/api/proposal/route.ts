import { NextRequest, NextResponse } from "next/server";
import { createClient } from '@supabase/supabase-js';

export async function GET(request: NextRequest): Promise<NextResponse> {

    const proposalId = request.nextUrl.searchParams.get('proposalId');
    if (proposalId === null) return NextResponse.json({ error: 'No proposal ID provided' }, { status: 400 });

    const supabaseUrl = process.env.SUPABASE_URL || '';
    const supabaseKey = process.env.SUPABASE_SECRET_KEY || '';
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { data, error } = await supabase.from('proposals').select('*').eq('Proposal', proposalId);
    if (data === null) return NextResponse.json({ error: error }, { status: 500 });
    
    let imageUrls = [];
    for (let frame of data[0]['frames']) {
        imageUrls.push(frame['imageURL']);
    }

    let mintUrl = data[0]['mintURL'];
    let primaryColor = data[0]['primaryColor'];
    
    return NextResponse.json({
        'n_sentences': data[0]['story'].split('.').length - 1,
        'title': data[0]['title'],
        'chain': data[0]['Chain'],
        'dao': data[0]['DAO'],
        'imageUrls': imageUrls,
        'mintUrl': mintUrl,
        'primaryColor': primaryColor
    })
}
