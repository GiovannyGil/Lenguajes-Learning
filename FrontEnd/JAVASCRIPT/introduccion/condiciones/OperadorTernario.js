const boleto = 'vip';
// let codAccess;


/*
if (boleto === 'vip') {
    codAccess = 'VIP-123-GPP'
} else {
    codAccess = 'REG-123-UDO'
}
*/


const codAccess = (boleto === 'vip') ? 'VIP-123-GPP' : 'REG-123-UDO';

console.log(codAccess)


/*
(boleto === 'vip') ? 
console.log('tu boleto es tipo VIP') 
: 
console.log('REG-123-UDO');
*/