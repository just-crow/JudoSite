import { supabase } from './src/lib/supabase';

async function fixDB() {
    const { data: dbCompetitors } = await supabase.from('competitors').select('*');
    if (!dbCompetitors) return;

    for (const c of dbCompetitors) {
        if (!c.results) continue;
        let fixed = c.results;
        fixed = fixed.replace(/ðŸ¥‡/g, '🥇');
        fixed = fixed.replace(/ðŸ¥ˆ/g, '🥈');
        fixed = fixed.replace(/ðŸ¥‰/g, '🥉');
        
        if (fixed !== c.results) {
            console.log(`Updating ${c.first_name} ${c.last_name}`);
            await supabase.from('competitors').update({ results: fixed }).eq('id', c.id);
        }
    }
    console.log("Done database fix");
}

fixDB();