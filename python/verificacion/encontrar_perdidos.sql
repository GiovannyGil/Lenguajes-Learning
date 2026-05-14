SELECT 
    pe.persona_id AS 'usuarios', 
    p.nombre, 
    p.apellidos, 
    pe.codigo_promocional AS 'codigo', 
    pe.fecha_registro AS 'fecha de registro', 
    pe.url_imagen AS 'imagen de empaque'  
FROM registro_empaque pe 
INNER JOIN persona p ON p.id = pe.persona_id
WHERE pe.persona_id IN (
    142, 336, 336, 95, 414, 336, 504, 494, 562, 501, 501, 501, 501, 501, 501, 501, 501, 501, 501, 501, 501, 501, 501, 501, 562, 49, 501, 501, 501, 
	 501, 336, 420, 720, 819, 788
) 
AND pe.codigo_promocional IN (
    'ZBYTFR084G', 'BCCKZX0991', 'BBCJZX099E', 's2AXCM089B', '5YEHMW206G', 'MEPCNY104N', 'CNUXFY087A', 'F1RKIS037D', 'CNRKND087M', 'F1UHIH096U', 'F1JRIE096O',
	 'F1CLIO085U', 'F1WPJE0780', 'F1UDOA078P', 'F1IMCO025F', 'F1VFGJ078U', 'F1INCK085I', '10GHRS082K', 'F1DKJE0781', 'F1CJHM085V', 'F1CDHK0358', 
	 '1MUTHK078J', 'FLVFGI078W', 'FLVRIA078T', 'BAJVCW096G', '24DYyu1050', 
	 'F1VFGF078U', 'FLVZCM082Z', 'F1NBMN0900', 'F1NBRM080R', 'MEPCRY104R', 'H9BCDJ104Q', 'LXZRED074H', 'FLHNAP107T', '0KVLYX107O')
ORDER BY p.nombre ASC, p.apellidos ASC, pe.fecha_registro DESC;
