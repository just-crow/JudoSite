const fs = require('fs');
let c = fs.readFileSync('src/app/layout.tsx', 'utf-8');
c = c.replace('<html lang="bs">', '<html lang="bs" suppressHydrationWarning>');
c = c.replace(/<body className=\{`\$\{inter\.variable\} \$\{pacifico\.variable\} antialiased bg-white`\}>/, '<body className={`\${inter.variable} \${pacifico.variable} antialiased bg-white`} suppressHydrationWarning>');
fs.writeFileSync('src/app/layout.tsx', c);
