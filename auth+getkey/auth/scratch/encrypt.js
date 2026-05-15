const strings = [
    '69ecb7af37fe967057a0650e',
    '29bdbbfcb343f372e30063c9cddbcfbb66fdac77',
    'https://cshellvn.vercel.app',
    'cshellvn_super_secret_key_2024'
];
const key = 0x55;
strings.forEach(s => {
    const bytes = s.split('').map(c => '0x' + (c.charCodeAt(0) ^ key).toString(16).toUpperCase().padStart(2, '0'));
    console.log(`String: ${s}`);
    console.log(`Bytes: { ${bytes.join(', ')}, 0x00 }`);
    console.log('');
});
