const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const promptUser = (query) => new Promise((resolve) => rl.question(query, resolve));

async function main() {
    console.log("=================================================");
    console.log("      REVIEW PAPER WORKFLOW - CLI WRAPPER        ");
    console.log("=================================================");
    
    let content;
    try {
        content = fs.readFileSync('workflow/agent_workflow_prompts.md', 'utf8');
    } catch (err) {
        console.error("Error reading workflow/agent_workflow_prompts.md");
        process.exit(1);
    }

    // Split the markdown file by "## Stage" or "## Before You Begin" or "## CONFIG"
    const sections = content.split(/\n## /);
    
    for (let i = 0; i < sections.length; i++) {
        let section = sections[i];
        if (i > 0) section = "## " + section; // Put the header back
        
        // Skip header stuff if it's just the main title
        if (i === 0 && !section.includes('##')) {
            console.log(section.trim());
            console.log("\n-------------------------------------------------\n");
            continue;
        }

        console.log("\x1b[36m%s\x1b[0m", "\n--- NEXT STEP ---");
        console.log(section.trim());
        console.log("\n-------------------------------------------------");
        
        if (section.includes("Stage 3:")) {
            console.log("\n\x1b[33m%s\x1b[0m", "NOTE: Before exporting, make sure you ran `npm install docx` or `pip install python-docx`!");
        }

        if (i < sections.length - 1) {
            await promptUser("\x1b[32mPress ENTER to view the next stage prompt...\x1b[0m");
            console.clear();
        }
    }
    
    console.log("\nWorkflow complete! You should now have your generated DOCX file.");
    rl.close();
}

main();
