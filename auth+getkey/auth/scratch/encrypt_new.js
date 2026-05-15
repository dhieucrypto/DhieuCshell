const strings = [
    '69ecc99e4303c295321d3531',
    '4697f72a86fbf75563ef8c2b5755f0c3abffc21f'
];
const key = 0x55;
strings.forEach(s => {
    const bytes = s.split('').map(c => '0x' + (c.charCodeAt(0) ^ key).toString(16).toUpperCase().padStart(2, '0'));
    console.log(`String: ${s}`);
    console.log(`Bytes: { ${bytes.join(', ')}, 0x00 }`);
    console.log('');
});
