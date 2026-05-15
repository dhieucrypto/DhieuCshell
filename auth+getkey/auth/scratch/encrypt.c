
const char* strings[] = {
    "69ecb7af37fe967057a0650e",
    "29bdbbfcb343f372e30063c9cddbcfbb66fdac77",
    "https://cshellvn.vercel.app",
    "cshellvn_super_secret_key_2024"
};

const char key = 0x55;

for (int i = 0; i < 4; i++) {
    const char* s = strings[i];
    printf("String: %s\nBytes: { ", s);
    while (*s) {
        printf("0x%02X, ", (unsigned char)(*s ^ key));
        s++;
    }
    printf("0x00 }\n\n");
}
