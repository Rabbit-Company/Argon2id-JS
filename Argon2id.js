/*
Argon2id-JS v1.0.0
https://github.com/Rabbit-Company/Argon2id-JS
License: GPL-3.0
*/

class Argon2id{
	construtor(){
		this.mm = NaN;
		this.H_0 = NaN;
		this.p = NaN;
		this.q = NaN;
	}

	LE32(data){
		let b = new Uint8Array(4);
		b[0] = (data);
		b[1] = (((data) >> 8) & 0xFF);
		b[2] = (((data) >> 16) & 0xFF);
		b[3] = (((data) >> 24) & 0xFF);
		return Array.from(b);
	}

	LE64(data){
		let b = new Uint8Array(8);
		b[0] = (data);
		b[1] = (((data) >> 8) & 0xFF);
		b[2] = (((data) >> 16) & 0xFF);
		b[3] = (((data) >> 24) & 0xFF);
		return Array.from(b);
	}

	toHex(bytes){
		return Array.prototype.map.call(bytes, function (n) {
			return (n < 16 ? '0' : '') + n.toString(16);
		}).join('');
	}

	ascii(str){
		var arr1 = [];
		for(var n = 0, l = str.length; n < l; n ++){
			var hex = Number(str.charCodeAt(n));
			arr1.push(hex);
		}
		return arr1;
	}

	extract(B, i){
		if(i == 0) return this.Uint8ArrayToBigInt(B.slice(0,4));
		if(i == 1) return this.Uint8ArrayToBigInt(B.slice(4,8));
	}

	NumberToUint8Array = number => {
		var array = [], bigint = BigInt(number);
		for(let i = 0; i < Math.ceil(Math.floor(Math.log2(new Number(number)) + 1) / 8); i++)
			array.unshift(new Number((bigint >> BigInt(8 * i)) & 255n));
		return new Uint8Array(array).reverse();
	}

	Uint8ArrayToBigInt = Uint8Array => [...Uint8Array].reduce((prev, curr, index) => BigInt(prev) | (BigInt(curr) << BigInt(index * 8)));

	ZERO(P){
		return new Uint8Array(P).fill(0);
	}

	Concatenate(a, b, c = ''){
		return new Uint8Array([ ...a, ...b, ...c ]);
	}

	XOR(X, Y){
		let R = new Uint8Array(1024);
		for(let index = 0; index < X.length; index++) R[index] = X[index] ^ Y[index];
		return R;
	}

	MOD(n, m){
		return ((n % m) + m) % m;
	}

	GB(va, vb, vc, vd){
		const max = 2n ** 64n - 1n;
		let tmp1 = BigInt(4294967295);
		va = (va + vb + BigInt(2) * (va & tmp1) * (vb & tmp1)) & BigInt.asUintN(64, max);
		let tmp = vd ^ va;
		vd = (tmp >> BigInt(32)) | ((tmp & tmp1) << BigInt(32));
		vc = (vc + vd + BigInt(2) * (vc & tmp1) * (vd & tmp1)) & BigInt.asUintN(64, max);
		tmp = vb ^ vc;
		vb = (tmp >> BigInt(24)) | ((tmp & BigInt(0xffffff)) << BigInt(40));
		va = (va + vb + BigInt(2) * (va & tmp1) * (vb & tmp1)) & BigInt.asUintN(64, max);
		tmp = vd ^ va;
		vd = (tmp >> BigInt(16)) | ((tmp & BigInt(0xffff)) << BigInt(48));
		vc = (vc + vd + BigInt(2) * (vc & tmp1) * (vd & tmp1)) & BigInt.asUintN(64, max);
		tmp = vb ^ vc;
		vb = (tmp >> BigInt(63)) | ((tmp << BigInt(1)) & BigInt.asUintN(64, max));
		return [va, vb, vc, vd];
	}

	P(S0, S1, S2, S3, S4, S5, S6, S7){
		let rem;
		let v_0 = this.Uint8ArrayToBigInt(S0.slice(0,8));
		let v_1 = this.Uint8ArrayToBigInt(S0.slice(8,16));
		let v_2 = this.Uint8ArrayToBigInt(S1.slice(0,8));
		let v_3 = this.Uint8ArrayToBigInt(S1.slice(8,16));
		let v_4 = this.Uint8ArrayToBigInt(S2.slice(0,8));
		let v_5 = this.Uint8ArrayToBigInt(S2.slice(8,16));
		let v_6 = this.Uint8ArrayToBigInt(S3.slice(0,8));
		let v_7 = this.Uint8ArrayToBigInt(S3.slice(8,16));
		let v_8 = this.Uint8ArrayToBigInt(S4.slice(0,8));
		let v_9 = this.Uint8ArrayToBigInt(S4.slice(8,16));
		let v_10 = this.Uint8ArrayToBigInt(S5.slice(0,8));
		let v_11 = this.Uint8ArrayToBigInt(S5.slice(8,16));
		let v_12 = this.Uint8ArrayToBigInt(S6.slice(0,8));
		let v_13 = this.Uint8ArrayToBigInt(S6.slice(8,16));
		let v_14 = this.Uint8ArrayToBigInt(S7.slice(0,8));
		let v_15 = this.Uint8ArrayToBigInt(S7.slice(8,16));

		let V = this.GB(v_0, v_4, v_8, v_12);
		v_0 = V[0]; v_4 = V[1]; v_8 = V[2]; v_12 = V[3];

		V = this.GB(v_1, v_5, v_9, v_13);
		v_1 = V[0]; v_5 = V[1]; v_9 = V[2]; v_13 = V[3];

		V = this.GB(v_2, v_6, v_10, v_14);
		v_2 = V[0]; v_6 = V[1]; v_10 = V[2]; v_14 = V[3];

		V = this.GB(v_3, v_7, v_11, v_15);
		v_3 = V[0]; v_7 = V[1]; v_11 = V[2]; v_15 = V[3];

		V = this.GB(v_0, v_5, v_10, v_15);
		v_0 = V[0]; v_5 = V[1]; v_10 = V[2]; v_15 = V[3];

		V = this.GB(v_1, v_6, v_11, v_12);
		v_1 = V[0]; v_6 = V[1]; v_11 = V[2]; v_12 = V[3];

		V = this.GB(v_2, v_7, v_8, v_13);
		v_2 = V[0]; v_7 = V[1]; v_8 = V[2]; v_13 = V[3];

		V = this.GB(v_3, v_4, v_9, v_14);
		v_3 = V[0]; v_4 = V[1]; v_9 = V[2]; v_14 = V[3];

		v_0 = this.NumberToUint8Array(v_0); v_1 = this.NumberToUint8Array(v_1);
		v_2 = this.NumberToUint8Array(v_2); v_3 = this.NumberToUint8Array(v_3);
		v_4 = this.NumberToUint8Array(v_4); v_5 = this.NumberToUint8Array(v_5);
		v_6 = this.NumberToUint8Array(v_6); v_7 = this.NumberToUint8Array(v_7);
		v_8 = this.NumberToUint8Array(v_8); v_9 = this.NumberToUint8Array(v_9);
		v_10 = this.NumberToUint8Array(v_10); v_11 = this.NumberToUint8Array(v_11);
		v_12 = this.NumberToUint8Array(v_12); v_13 = this.NumberToUint8Array(v_13);
		v_14 = this.NumberToUint8Array(v_14); v_15 = this.NumberToUint8Array(v_15);

		if(v_0.length < 8){
			rem = 8 - v_0.length;
			v_0 = this.Concatenate(v_0, this.ZERO(rem));
		}
		if(v_1.length < 8){
			rem = 8 - v_1.length;
			v_1 = this.Concatenate(v_1, this.ZERO(rem));
		}
		if(v_2.length < 8){
			rem = 8 - v_2.length;
			v_2 = this.Concatenate(v_2, this.ZERO(rem));
		}
		if(v_3.length < 8){
			rem = 8 - v_3.length;
			v_3 = this.Concatenate(v_3, this.ZERO(rem));
		}
		if(v_4.length < 8){
			rem = 8 - v_4.length;
			v_4 = this.Concatenate(v_4, this.ZERO(rem));
		}
		if(v_5.length < 8){
			rem = 8 - v_5.length;
			v_5 = this.Concatenate(v_5, this.ZERO(rem));
		}
		if(v_6.length < 8){
			rem = 8 - v_6.length;
			v_6 = this.Concatenate(v_6, this.ZERO(rem));
		}
		if(v_7.length < 8){
			rem = 8 - v_7.length;
			v_7 = this.Concatenate(v_7, this.ZERO(rem));
		}
		if(v_8.length < 8){
			rem = 8 - v_8.length;
			v_8 = this.Concatenate(v_8, this.ZERO(rem));
		}
		if(v_9.length < 8){
			rem = 8 - v_9.length;
			v_9 = this.Concatenate(v_9, this.ZERO(rem));
		}
		if(v_10.length < 8){
			rem = 8 - v_10.length;
			v_10 = this.Concatenate(v_10, this.ZERO(rem));
		}
		if(v_11.length < 8){
			rem = 8 - v_11.length;
			v_11 = this.Concatenate(v_11, this.ZERO(rem));
		}
		if(v_12.length < 8){
			rem = 8 - v_12.length;
			v_12 = this.Concatenate(v_12, this.ZERO(rem));
		}
		if(v_13.length < 8){
			rem = 8 - v_13.length;
			v_13 = this.Concatenate(v_13, this.ZERO(rem));
		}
		if(v_14.length < 8){
			rem = 8 - v_14.length;
			v_14 = this.Concatenate(v_14, this.ZERO(rem));
		}
		if(v_15.length < 8){
			rem = 8 - v_15.length;
			v_15 = this.Concatenate(v_15, this.ZERO(rem));
		}

		S0 = this.Concatenate(v_0, v_1);
		S1 = this.Concatenate(v_2, v_3);
		S2 = this.Concatenate(v_4, v_5);
		S3 = this.Concatenate(v_6, v_7);
		S4 = this.Concatenate(v_8, v_9);
		S5 = this.Concatenate(v_10, v_11);
		S6 = this.Concatenate(v_12, v_13);
		S7 = this.Concatenate(v_14, v_15);

		return [S0, S1, S2, S3, S4, S5, S6, S7];
	}

	G(X, Y){
		let R = this.XOR(X,Y);
		let Q = [];
		let pp;
		let rN;
		let zzz;

		for(let index = 0; index < 8; index++){
			rN = 128*index;
			pp = this.P(R.slice(rN, rN+16), R.slice(rN+16, rN+32), R.slice(rN+32, rN+48), R.slice(rN+48, rN+64), R.slice(rN+64, rN+80), R.slice(rN+80, rN+96), R.slice(rN+96, rN+112), R.slice(rN+112, rN+128));
			for(let index = 0; index < pp.length; index++) Q = this.Concatenate(Q, pp[index]);
		}

		let Z = [];
		for(let index = 0; index < 8; index++){
			rN = 16*index;
			pp = this.P(Q.slice(rN, rN+16), Q.slice(rN+128, rN+128+16), Q.slice(rN+256, rN+256+16), Q.slice(rN+384, rN+384+16), Q.slice(rN+512, rN+512+16), Q.slice(rN+640, rN+640+16), Q.slice(rN+768, rN+768+16), Q.slice(rN+896, rN+896+16));
			for(let index = 0; index < pp.length; index++) Z = this.Concatenate(Z, pp[index]);
		}

		let ZZ = [];
		for(let index = 0; index < 8; index++){
			rN = 16*index;
			zzz = this.Concatenate(this.Concatenate(this.Concatenate(this.Concatenate(this.Concatenate(this.Concatenate(this.Concatenate(Z.slice(rN, rN+16), Z.slice(rN+128, rN+128+16)), Z.slice(rN+256, rN+256+16)), Z.slice(rN+384, rN+384+16)), Z.slice(rN+512, rN+512+16)), Z.slice(rN+640, rN+640+16)), Z.slice(rN+768, rN+768+16)), Z.slice(rN+896, rN+896+16));
			ZZ = this.Concatenate(ZZ, zzz);
		}

		return this.XOR(ZZ,R);
	}

	blake2bSetup(out_len, KEY=null){
		this.context = new Blake2b().blake2bInit(out_len, KEY);
	}

	Argon2Operation(p, T, m, time_cost, v, y, P, S, K = "", X = ""){
		this.H_0 = this.EstablishH_0(p, T, m, time_cost, v, y, P, S, K, X);
		this.AllocateMemory(p, m);
		this.p = p;
		this.q = this.mm/this.p;
		var segment_Length = this.q/4;

		let B = new Array(this.p);
		for(let i = 0; i < this.p; i++) B[i] = new Array(this.q);

		for(let t = 0; t < time_cost; t++){
			for(let segment = 0; segment < 4; segment++){
				var handles = new Array(p);
				for(let i = 0; i < p; i++) handles[i] = this._fill_segment(B, t, segment, i, y, segment_Length,this.H_0, this.q, p, this.mm, time_cost, v);
				for(let i = 0; i < p; i++){
					var new_blocks = handles[i];
					for(let index = 0; index < segment_Length; index++) B[i][segment * segment_Length + index] = new_blocks[index];
				}
			}
		}

		let B_FINAL = this.ZERO(1024);
		for(let index = 0; index < p; index++) B_FINAL = this.XOR(B_FINAL, B[index][this.q-1]);
		return this.variableLengthHashFunction(T, B_FINAL);
	}

	EstablishH_0(p, T, m, t, v, y, P, S, K = "", X = ""){
		var A1 = this.Concatenate(this.Concatenate(this.Concatenate(this.Concatenate(this.Concatenate(this.LE32(p), this.LE32(T)), this.LE32(m)), this.LE32(t)), this.LE32(v)), this.LE32(y));
		var A2 = this.Concatenate(this.LE32(P.length), this.ascii(P));
		var A3 = this.Concatenate(this.LE32(S.length), this.ascii(S));
		var A4 = this.Concatenate(this.LE32(K.length), this.ascii(K));
		let A5 = this.Concatenate(this.LE32(X.length), this.ascii(X));
		var A = this.Concatenate(this.Concatenate(this.Concatenate(this.Concatenate(A1, A2), A3), A4), A5);

		this.blake2bSetup(64);
		new Blake2b().blake2bUpdate(this.context, A);
		return new Blake2b().blake2bFinal(this.context);
	}

	AllocateMemory(p, m){
		let memory = 4 * p * Math.floor(m/(4*p));
		this.mm = memory;
	}

	variableLengthHashFunction(T, A){
		if (T <= 64){
			this.blake2bSetup(T);
			toHash = this.Concatenate(this.LE32(T), A);
			new Blake2b().blake2bUpdate(this.context, toHash);
			return new Blake2b().blake2bFinal(this.context);
		}else{
			var r = Math.ceil(T/32) - 2;
			var toHash = this.Concatenate(this.LE32(T),A);
			this.blake2bSetup(64);
			new Blake2b().blake2bUpdate(this.context, toHash);
			var V = new Blake2b().blake2bFinal(this.context);
			var W = V.slice(0,32);

			for(let index = 2; index <= r; index++){
				this.blake2bSetup(64);
				new Blake2b().blake2bUpdate(this.context, V);
				V = new Blake2b().blake2bFinal(this.context);
				W = this.Concatenate(W, V.slice(0,32));
			}

			var outLength = T - 32*r;
			this.blake2bSetup(outLength);
			new Blake2b().blake2bUpdate(this.context, V);
			V = new Blake2b().blake2bFinal(this.context);
			return this.Concatenate(W, V);
		}
	}

	_fill_segment(B, t, segment, i, type_code, segment_length, H0, q, parallelism, m_prime, time_cost, version){
		var data_independant = ((type_code == 1) || (type_code == 2 && t == 0 && segment <= 1));

		if (data_independant){
			var pseudo_rands = [];
			var ctr = 0;

			while (pseudo_rands.length < segment_length){
				ctr += 1;
				var A = this.Concatenate(this.Concatenate(this.Concatenate(this.Concatenate(this.Concatenate(this.Concatenate(this.Concatenate(this.LE64(t), this.LE64(i)), this.LE64(segment)), this.LE64(m_prime)), this.LE64(time_cost)), this.LE64(type_code)), this.LE64(ctr)), this.ZERO(968));
				var address_block = this.G(this.ZERO(1024), this.G(this.ZERO(1024), A));
				for(let addr_i = 0; addr_i < 1024; addr_i+=8) pseudo_rands.push([this.Uint8ArrayToBigInt(address_block.slice(addr_i,addr_i+4)), this.Uint8ArrayToBigInt(address_block.slice(addr_i+4,addr_i+8))])
			}
		}

		for(let index = 0; index < segment_length; index++){
			var j = segment * segment_length + index;
			if(t == 0 && j < 2){
				B[i][j] = this.variableLengthHashFunction(1024, this.Concatenate(this.H_0, this.LE32(j), this.LE32(i)));
				continue;
			}

			var J1 = NaN; var J2 = NaN;
			if (data_independant){
				J1 = pseudo_rands[index][0]; J2 = pseudo_rands[index][1];
			}else{
				J1 = this.extract(B[i][this.MOD(j-1, q)], 0); J2 = this.extract(B[i][this.MOD(j-1, q)], 1);
			}

			var i_prime = NaN;
			if(t == 0 && segment == 0){
				i_prime = i;
			}else{
				i_prime = this.MOD(J2, BigInt(parallelism));
			}

			var ref_area_size = NaN;
			if (t == 0){
				if(segment == 0 || i == i_prime){
					ref_area_size = j - 1;
				}else if(index == 0){
					ref_area_size = segment * segment_length - 1;
				}else{
					ref_area_size = segment * segment_length;
				}
			}else if(i == i_prime){
				ref_area_size = q - segment_length + index - 1;
			}else if(index == 0){
				ref_area_size = q - segment_length - 1;
			}else{
				ref_area_size = q - segment_length;
			}

			var rel_pos = (J1 ** BigInt(2)) >> BigInt(32);
			rel_pos = BigInt(ref_area_size) - BigInt(1) - ((BigInt(ref_area_size) * rel_pos) >> BigInt(32));
			var start_pos = 0;

			if(t != 0 && segment != 3) start_pos = (segment + 1) * segment_length;
			var j_prime = this.MOD((BigInt(start_pos) + rel_pos), BigInt(q));

			var new_block = this.G(B[i][this.MOD(j-1, q)], B[i_prime][j_prime]);
			if(t != 0 && version == 0x13) new_block = this.XOR(B[i][j], new_block);
			B[i][j] = new_block;
		}

		return B[i].slice(segment*segment_length,(segment+1)*segment_length);
	}

	hexToBase64(hexstring) {
		return btoa(hexstring.match(/\w{2}/g).map(function(a) {
  		return String.fromCharCode(parseInt(a, 16));
		}).join(""));
	}

	base64ToHex(str) {
		const raw = atob(str);
		let result = '';
		for (let i = 0; i < raw.length; i++) {
			const hex = raw.charCodeAt(i).toString(16);
			result += (hex.length === 2 ? hex : '0' + hex);
		}
		return result.toUpperCase();
	}

	randRange(min, max) {
		var range = max - min;
		var requestBytes = Math.ceil(Math.log2(range) / 8);
		if (!requestBytes) return min;

		var maxNum = Math.pow(256, requestBytes);
		var ar = new Uint8Array(requestBytes);

		while (true) {
			window.crypto.getRandomValues(ar);
			var val = 0;
			for (var i = 0;i < requestBytes;i++) val = (val << 8) + ar[i];
			if (val < maxNum - maxNum % range) return min + (val % range);
		}
	}

	static randomSalt(){
		let a2id = new Argon2id();
		let length = 16;
		let lcase = "abcdefghijklmnopqrstuvwxyz";
		let ucase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
		let numb = "1234567890";

		let salt = "";
		for (let i = 0; i < length; i++) salt += lcase.charAt(a2id.randRange(0, lcase.length));
		salt = salt.split("");
		for (let i = 0; i < length/2; i++) salt[a2id.randRange(0, salt.length)] = ucase.charAt(a2id.randRange(0, ucase.length));
		for (let i = 0; i < length/2; i++) salt[a2id.randRange(0, salt.length)] = numb.charAt(a2id.randRange(0, numb.length));
		return salt.join("");
	}

	static hash(message, salt = "", t=3, m=32, p=3, l=32, secret = "", associatedData = ""){
		let a2id = new Argon2id();
		let output = a2id.Argon2Operation(p, l, m, t, 0x13, 2, message, salt, secret, associatedData);
		return a2id.toHex(output);
	}

	static hashDecode(hashEncoded){
		let a2id = new Argon2id();
		let digest = hashEncoded.split('$')[5];
		return a2id.base64ToHex(digest).toLowerCase();
	}

	static hashEncoded(message, salt = "", t=3, m=32, p=3, l=32, secret = "", associatedData = ""){
		let a2id = new Argon2id();
		let output = a2id.Argon2Operation(p, l, m, t, 0x13, 2, message, salt, secret, associatedData);
		return "$argon2id$v=19$m="+m+",t="+t+",p="+p+"$"+btoa(salt).replaceAll("=", "")+"$"+a2id.hexToBase64(a2id.toHex(output)).replaceAll("=", "");
	}
}