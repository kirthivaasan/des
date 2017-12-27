/*
  des.js
  @author kirthip
  References:
    https://en.wikipedia.org/wiki/DES_supplementary_material
    https://en.wikipedia.org/wiki/Data_Encryption_Standard
    http://page.math.tu-berlin.de/~kant/teaching/hess/krypto-ws2006/des.htm
*/

// S-boxes
S1 = 
[
14, 4, 13, 1, 2, 15, 11, 8, 3, 10, 6, 12, 5, 9, 0, 7, 
0, 15, 7, 4, 14, 2, 13, 1, 10, 6, 12, 11, 9, 5, 3, 8, 
4, 1, 14, 8, 13, 6, 2, 11, 15, 12, 9, 7, 3, 10, 5, 0, 
15, 12, 8, 2, 4, 9, 1, 7, 5, 11, 3, 14, 10, 0, 6, 13
];

S2 = 
[
15, 1, 8, 14, 6, 11, 3, 4, 9, 7, 2, 13, 12, 0, 5, 10, 
3, 13, 4, 7, 15, 2, 8, 14, 12, 0, 1, 10, 6, 9, 11, 5, 
0, 14, 7, 11, 10, 4, 13, 1, 5, 8, 12, 6, 9, 3, 2, 15, 
13, 8, 10, 1, 3, 15, 4, 2, 11, 6, 7, 12, 0, 5, 14, 9
];

S3 = 
[
10, 0, 9, 14, 6, 3, 15, 5, 1, 13, 12, 7, 11, 4, 2, 8, 
13, 7, 0, 9, 3, 4, 6, 10, 2, 8, 5, 14, 12, 11, 15, 1, 
13, 6, 4, 9, 8, 15, 3, 0, 11, 1, 2, 12, 5, 10, 14, 7, 
1, 10, 13, 0, 6, 9, 8, 7, 4, 15, 14, 3, 11, 5, 2, 12
];

S4 = 
[
7, 13, 14, 3, 0, 6, 9, 10, 1, 2, 8, 5, 11, 12, 4, 15, 
13, 8, 11, 5, 6, 15, 0, 3, 4, 7, 2, 12, 1, 10, 14, 9, 
10, 6, 9, 0, 12, 11, 7, 13, 15, 1, 3, 14, 5, 2, 8, 4, 
3, 15, 0, 6, 10, 1, 13, 8, 9, 4, 5, 11, 12, 7, 2, 14
];

S5 = 
[
2, 12, 4, 1, 7, 10, 11, 6, 8, 5, 3, 15, 13, 0, 14, 9, 
14, 11, 2, 12, 4, 7, 13, 1, 5, 0, 15, 10, 3, 9, 8, 6, 
4, 2, 1, 11, 10, 13, 7, 8, 15, 9, 12, 5, 6, 3, 0, 14, 
11, 8, 12, 7, 1, 14, 2, 13, 6, 15, 0, 9, 10, 4, 5, 3
];

S6 = 
[
12, 1, 10, 15, 9, 2, 6, 8, 0, 13, 3, 4, 14, 7, 5, 11, 
10, 15, 4, 2, 7, 12, 9, 5, 6, 1, 13, 14, 0, 11, 3, 8, 
9, 14, 15, 5, 2, 8, 12, 3, 7, 0, 4, 10, 1, 13, 11, 6, 
4, 3, 2, 12, 9, 5, 15, 10, 11, 14, 1, 7, 6, 0, 8, 13
];

S7 = 
[
4, 11, 2, 14, 15, 0, 8, 13, 3, 12, 9, 7, 5, 10, 6, 1, 
13, 0, 11, 7, 4, 9, 1, 10, 14, 3, 5, 12, 2, 15, 8, 6, 
1, 4, 11, 13, 12, 3, 7, 14, 10, 15, 6, 8, 0, 5, 9, 2, 
6, 11, 13, 8, 1, 4, 10, 7, 9, 5, 0, 15, 14, 2, 3, 12
];

S8 = 
[
13, 2, 8, 4, 6, 15, 11, 1, 10, 9, 3, 14, 5, 0, 12, 7, 
1, 15, 13, 8, 10, 3, 7, 4, 12, 5, 6, 11, 0, 14, 9, 2, 
7, 11, 4, 1, 9, 12, 14, 2, 0, 6, 10, 13, 15, 3, 5, 8, 
2, 1, 14, 7, 4, 10, 8, 13, 15, 12, 9, 0, 3, 5, 6, 11
];

S_boxes = [S1, S2, S3, S4, S5, S6, S7, S8];

IP_table = 
[
58,  50,  42,  34,  26,  18,  10,  2,
60,  52,  44,  36,  28,  20,  12,  4,
62,  54,  46,  38,  30,  22,  14,  6,
64,  56,  48,  40,  32,  24,  16,  8,
57,  49,  41,  33,  25,  17,  9 ,  1,
59,  51,  43,  35,  27,  19,  11,  3,
61,  53,  45,  37,  29,  21,  13,  5,
63,  55,  47,  39,  31,  23,  15,  7
];

IP_Inv_table = 
[
40, 8, 48, 16, 56, 24, 64, 32,
39, 7, 47, 15, 55, 23, 63, 31,
38, 6, 46, 14, 54, 22, 62, 30,
37, 5, 45, 13, 53, 21, 61, 29,
36, 4, 44, 12, 52, 20, 60, 28,
35, 3, 43, 11, 51, 19, 59, 27,
34, 2, 42, 10, 50, 18, 58, 26,
33, 1, 41, 9, 49, 17, 57, 25
];

E = 
[
32, 1, 2, 3, 4, 5,
4, 5, 6, 7, 8, 9,
8, 9, 10, 11, 12, 13,
12, 13, 14, 15, 16, 17,
16, 17, 18, 19, 20, 21,
20, 21, 22, 23, 24, 25,
24, 25, 26, 27, 28, 29,
28, 29, 30, 31, 32, 1
];

P = 
[
16, 7, 20, 21,
29, 12, 28, 17,
1, 15, 23, 26,
5, 18, 31, 10,
2, 8, 24, 14,
32, 27, 3, 9,
19, 13, 30, 6,
22, 11, 4, 25
];

PC1 =
[
57, 49, 41, 33, 25, 17, 9,
1, 58, 50, 42, 34, 26, 18,
10, 2, 59, 51, 43, 35, 27,
19, 11, 3, 60, 52, 44, 36,
63, 55, 47, 39, 31, 23, 15,
7, 62, 54, 46, 38, 30, 22,
14, 6, 61, 53, 45, 37, 29,
21, 13, 5, 28, 20, 12, 4
];

PC2 = 
[
14, 17, 11, 24, 1, 5,
3, 28, 15, 6, 21, 10,
23, 19, 12, 4, 26, 8,
16, 7, 27, 20, 13, 2,
41, 52, 31, 37, 47, 55,
30, 40, 51, 45, 33, 48,
44, 49, 39, 56, 34, 53,
46, 42, 50, 36, 29, 32
];

KEY_SCHEDULE = [1, 1, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 1];

ECB_SUBKEYS = [];
     
// DES 
function DES(M, K, encrypt=true, ecb=false) {
    
    // 0. check to see if inputs are 64 bit, truncate them if not. If less than 64, pad them with 0s. (not secure)
    if (M.length > 64) {
        M = M.slice(0, 64);
    }
    
    if (K.length > 64) {
        K = K.slice(0, 64);
    }
    
    if (M.length < 64) {
        for (var i = M.length-1; i < 64; i++) M += "0";
    }
    
    if (K.length < 64) return; // abort if key is not 64 bits.
    
    // 1. Pass K to key schedule to derive 16 subkeys.
    var subkeys;
    if (!ecb)
        subkeys = KeySchedule(K);
    else
        subkeys = ECB_SUBKEYS;
    
    if (!encrypt) subkeys = subkeys.reverse();
    
    // 2. Permute message with IP table
    M = permute(M, IP_table);
    
    // 3. Get left and right halves from 64 bit message.
    var L = M.slice(0, 32);
    var R = M.slice(32);
    
    // 4. 16 rounds through feistel network
    for (var i = 0; i < subkeys.length; i++) {
        var L_prev = L;
        var R_prev = R;
        var round_key = subkeys[i];
        L = R_prev;
        R = xor(Feistel(round_key, R_prev), L_prev);
    }
    
    // Do inverse IP table on concatenation of R16 and L16 to derive final ciphertext.
    // Remember the concatenation order is reversed, so it is R16 | L16
    var C = permute(R + L, IP_Inv_table);
    return C;
}

function KeySchedule(K) {
    // Permute K with PC1 (64 bit K to 56 bit K, with some scrambling)
    K = permute(K, PC1);
    var subkeys = [];
    // Get left half and right half
    var C = K.slice(0, 28);
    var D = K.slice(28);
    
    for (var i = 0; i < KEY_SCHEDULE.length; i++) {
        C = rol(C, KEY_SCHEDULE[i]);
        D = rol(D, KEY_SCHEDULE[i]);
        // Permute concatenation of left rotated halves with PC2.
        var final_key = permute(C + D, PC2);
        subkeys.push(final_key);
    }
    return subkeys;
}

function Feistel(round_key, R) {
    // 1. Expand R. E is the expansion table. XOR the expanded R with the round key, J.
    
    // the permute() functions is poorly named for this operation
    // nevertheless it does what is expected.
    
    R = permute(R, E);
    R = xor(R, round_key);
    
    var result = "";
    // 2. Pass R through S-boxes, 6 bits at a time.
    for (var i = 0; i < 8; i++) {
        var piece = R.slice(i*6, i*6 + 6);
        // Put piece through S-box
        var row_index = binary_2_bits[piece[0] + piece[5]];
        var column_index = binary_to_dec[piece.slice(1, 5)];
        var dec_value = S_boxes[i][row_index*16 + column_index];
        result += dec_to_binary[dec_value];
    }
    
    // 3. Reduction step. 48 bit to 32 bit.
    result = permute(result, P);
    return result;
}

// Bit manipulation Utilities

function xor(a, b) {
    var result = "";
    for (var i = 0; i < a.length; i++) {
        result += a[i] == b[i] ? '0' : '1';
    }
    return result;
}

/*
Left rotates a bitstring B by n bits.
Also known as left circular shift. 
*/
function rol(a, n) {
    var right = a.slice(0, n);
    var left = a.slice(n);
    return left + right;
}

// Permutes bitstring with table.
function permute(a, table) {
    var result = "";
    for (var i = 0; i < table.length; i++) {
        var index = table[i] - 1; // -1 since the table is indexed starting at 1 instead of 0.
        result += a[index];
    }
    return result;
}

var hex_to_binary  = 
{
    "0": "0000",
    "1": "0001",
    "2": "0010",
    "3": "0011",
    "4": "0100",
    "5": "0101",
    "6": "0110",
    "7": "0111",
    "8": "1000",
    "9": "1001",
    "A": "1010",
    "B": "1011",
    "C": "1100",
    "D": "1101",
    "E": "1110",
    "F": "1111"
};

var binary_to_hex  = 
{
    "0000": "0",
    "0001": "1",
    "0010": "2",
    "0011": "3",
    "0100": "4",
    "0101": "5",
    "0110": "6",
    "0111": "7",
    "1000": "8",
    "1001": "9",
    "1010": "A",
    "1011": "B",
    "1100": "C",
    "1101": "D",
    "1110": "E",
    "1111": "F"
};

var binary_to_dec  = 
{
    "0000": 0,
    "0001": 1,
    "0010": 2,
    "0011": 3,
    "0100": 4,
    "0101": 5,
    "0110": 6,
    "0111": 7,
    "1000": 8,
    "1001": 9,
    "1010": 10,
    "1011": 11,
    "1100": 12,
    "1101": 13,
    "1110": 14,
    "1111": 15
};

var dec_to_binary = 
{
    0: "0000",
    1: "0001",
    2: "0010",
    3: "0011",
    4: "0100",
    5: "0101",
    6: "0110",
    7: "0111",
    8: "1000",
    9: "1001",
    10: "1010",
    11: "1011",
    12: "1100",
    13: "1101",
    14: "1110",
    15: "1111"
};

var binary_2_bits = {"00":0, "01":1, "10":2, "11":3 };

function hexToBinary(hex_num) {
    binary_num_result = "";
    for (var i = 0; i < hex_num.length; i++) {
        binary_num_result += hex_to_binary[hex_num[i].toUpperCase()];
    }
    return binary_num_result;
} 

function binaryToHex(binary_string) {
    var result = "";
    for (var i = 0; i < binary_string.length; i = i + 4) {
        var nybble =  binary_string.slice(i, i + 4);
        result += binary_to_hex[nybble];
    }
    return result;
}

function asciiToBinary(ascii_string) {
    var result = "";
    for (var i = 0; i < ascii_string.length; i++) {
        var binary = ascii_string.charCodeAt(i).toString(2);
        // must pad
        binary = "00000000".slice(0, 8 - binary.length) + binary;
        result += binary;
    }
    return result;
}

function binaryToAscii(binary_string) {
    var result = "";
    for (var i = 0; i < binary_string.length; i += 8) {
        var byte_string = binary_string.slice(i, i + 8);
        var decimal_byte = parseInt(byte_string, 2).toString(10);
        result += String.fromCharCode(decimal_byte);
    }
    return result;
}


function hexToBinary(hex_string) {
    var result = "";
    for (var i = 0; i < hex_string.length; i++) {
        result += hex_to_binary[hex_string[i].toUpperCase()];
    }
    return result;
}

// this function just adds a space for nicer output.
function outputBitstring(B, size=4) {
    result = "";
    for (var i = 0; i < B.length; i = i + size) {
        result += B[i] + B[i+1] + B[i+2] + B[i+3];
        result += " "; 
    }
    return result;
}

function ECB(bitstring, K, encrypt=true) {
    // des block size is 64
    var ciphertext = "";
    //ECB_SUBKEYS = KeySchedule(K);
    for (var i = 0; i < bitstring.length; i = i + 64) {
        var M = bitstring.slice(i, i + 64);
        ciphertext += DES(M, K, encrypt, false); // set ecb true
    }
    return ciphertext;
}

function Optimized_ECB(bitstring, K, encrypt=true) {
    // des block size is 64
    var table = {};
    var ciphertext = "";
    ECB_SUBKEYS = KeySchedule(K);
    for (var i = 0; i < bitstring.length; i = i + 64) {
        var M = bitstring.slice(i, i + 64);
        if (M in table) {
            ciphertext += table[M]; // set ecb true
        } else {
            ciphertext += DES(M, K, encrypt, true); // set ecb true
            table[M] = ciphertext;
        }
        //ciphertext += DES(M, K, encrypt, true); // set ecb true
    }
    return ciphertext;
}