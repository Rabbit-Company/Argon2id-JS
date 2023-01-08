/*
Argon2id-JS v1.1.1
https://github.com/Rabbit-Company/Argon2id-JS
License: MIT
*/

function runWorker() {
  const memo = {};
  let context = null;

  function LE32(data) {
    let b = new Uint8Array(4);
    b[0] = (data);
    b[1] = (((data) >> 8) & 0xFF);
    b[2] = (((data) >> 16) & 0xFF);
    b[3] = (((data) >> 24) & 0xFF);
    return Array.from(b);
  }

  function LE64(data) {
    let b = new Uint8Array(8);
    b[0] = (data);
    b[1] = (((data) >> 8) & 0xFF);
    b[2] = (((data) >> 16) & 0xFF);
    b[3] = (((data) >> 24) & 0xFF);
    return Array.from(b);
  }

  function toHex(bytes) {
    return Array.prototype.map.call(bytes, function (n) {
      return (n < 16 ? '0' : '') + n.toString(16);
    }).join('');
  }

  function extract(B, i) {
    if (i == 0) return Uint8ArrayToBigInt(B.slice(0, 4));
    if (i == 1) return Uint8ArrayToBigInt(B.slice(4, 8));
  }

  function NumberToUint8Array(bigint) {
    var array = [];
    let length = Math.ceil(Math.floor(Math.log2(new Number(bigint)) + 1) / 8);
    for (let i = 0; i < length; i++) {
      array.unshift(new Number(bigint & 255n));
      bigint >>= 8n;
    }
    return new Uint8Array(array).reverse();
  }

  function Uint8ArrayToBigInt(uint8array) {
    let result = 0n;
    for (let i = uint8array.length - 1; i >= 0; i--) {
      result = BigInt(uint8array[i]) | result << 8n;
    }
    return result;
  }

  function ZERO(P) {
    return new Uint8Array(P);
  }

  function Concatenate(...items) {
    let length = 0;
    items.forEach(item => {
      length += item.length;
    });
    const result = new Uint8Array(length);
    let offset = 0;
    items.forEach(item => {
      result.set(item, offset);
      offset += item.length;
    });
    return result;
  }

  function XOR(X, Y) {
    let R = new Uint8Array(1024);
    for (let index = 0; index < X.length; index++) R[index] = X[index] ^ Y[index];
    return R;
  }

  function MOD(n, m) {
    return ((n % m) + m) % m;
  }

  function GB(va, vb, vc, vd) {
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

  function P(S0, S1, S2, S3, S4, S5, S6, S7) {
    let rem;
    let v_0 = Uint8ArrayToBigInt(S0.slice(0, 8));
    let v_1 = Uint8ArrayToBigInt(S0.slice(8, 16));
    let v_2 = Uint8ArrayToBigInt(S1.slice(0, 8));
    let v_3 = Uint8ArrayToBigInt(S1.slice(8, 16));
    let v_4 = Uint8ArrayToBigInt(S2.slice(0, 8));
    let v_5 = Uint8ArrayToBigInt(S2.slice(8, 16));
    let v_6 = Uint8ArrayToBigInt(S3.slice(0, 8));
    let v_7 = Uint8ArrayToBigInt(S3.slice(8, 16));
    let v_8 = Uint8ArrayToBigInt(S4.slice(0, 8));
    let v_9 = Uint8ArrayToBigInt(S4.slice(8, 16));
    let v_10 = Uint8ArrayToBigInt(S5.slice(0, 8));
    let v_11 = Uint8ArrayToBigInt(S5.slice(8, 16));
    let v_12 = Uint8ArrayToBigInt(S6.slice(0, 8));
    let v_13 = Uint8ArrayToBigInt(S6.slice(8, 16));
    let v_14 = Uint8ArrayToBigInt(S7.slice(0, 8));
    let v_15 = Uint8ArrayToBigInt(S7.slice(8, 16));

    let V = GB(v_0, v_4, v_8, v_12);
    v_0 = V[0]; v_4 = V[1]; v_8 = V[2]; v_12 = V[3];

    V = GB(v_1, v_5, v_9, v_13);
    v_1 = V[0]; v_5 = V[1]; v_9 = V[2]; v_13 = V[3];

    V = GB(v_2, v_6, v_10, v_14);
    v_2 = V[0]; v_6 = V[1]; v_10 = V[2]; v_14 = V[3];

    V = GB(v_3, v_7, v_11, v_15);
    v_3 = V[0]; v_7 = V[1]; v_11 = V[2]; v_15 = V[3];

    V = GB(v_0, v_5, v_10, v_15);
    v_0 = V[0]; v_5 = V[1]; v_10 = V[2]; v_15 = V[3];

    V = GB(v_1, v_6, v_11, v_12);
    v_1 = V[0]; v_6 = V[1]; v_11 = V[2]; v_12 = V[3];

    V = GB(v_2, v_7, v_8, v_13);
    v_2 = V[0]; v_7 = V[1]; v_8 = V[2]; v_13 = V[3];

    V = GB(v_3, v_4, v_9, v_14);
    v_3 = V[0]; v_4 = V[1]; v_9 = V[2]; v_14 = V[3];

    v_0 = NumberToUint8Array(v_0); v_1 = NumberToUint8Array(v_1);
    v_2 = NumberToUint8Array(v_2); v_3 = NumberToUint8Array(v_3);
    v_4 = NumberToUint8Array(v_4); v_5 = NumberToUint8Array(v_5);
    v_6 = NumberToUint8Array(v_6); v_7 = NumberToUint8Array(v_7);
    v_8 = NumberToUint8Array(v_8); v_9 = NumberToUint8Array(v_9);
    v_10 = NumberToUint8Array(v_10); v_11 = NumberToUint8Array(v_11);
    v_12 = NumberToUint8Array(v_12); v_13 = NumberToUint8Array(v_13);
    v_14 = NumberToUint8Array(v_14); v_15 = NumberToUint8Array(v_15);

    if (v_0.length < 8) {
      rem = 8 - v_0.length;
      v_0 = Concatenate(v_0, ZERO(rem));
    }
    if (v_1.length < 8) {
      rem = 8 - v_1.length;
      v_1 = Concatenate(v_1, ZERO(rem));
    }
    if (v_2.length < 8) {
      rem = 8 - v_2.length;
      v_2 = Concatenate(v_2, ZERO(rem));
    }
    if (v_3.length < 8) {
      rem = 8 - v_3.length;
      v_3 = Concatenate(v_3, ZERO(rem));
    }
    if (v_4.length < 8) {
      rem = 8 - v_4.length;
      v_4 = Concatenate(v_4, ZERO(rem));
    }
    if (v_5.length < 8) {
      rem = 8 - v_5.length;
      v_5 = Concatenate(v_5, ZERO(rem));
    }
    if (v_6.length < 8) {
      rem = 8 - v_6.length;
      v_6 = Concatenate(v_6, ZERO(rem));
    }
    if (v_7.length < 8) {
      rem = 8 - v_7.length;
      v_7 = Concatenate(v_7, ZERO(rem));
    }
    if (v_8.length < 8) {
      rem = 8 - v_8.length;
      v_8 = Concatenate(v_8, ZERO(rem));
    }
    if (v_9.length < 8) {
      rem = 8 - v_9.length;
      v_9 = Concatenate(v_9, ZERO(rem));
    }
    if (v_10.length < 8) {
      rem = 8 - v_10.length;
      v_10 = Concatenate(v_10, ZERO(rem));
    }
    if (v_11.length < 8) {
      rem = 8 - v_11.length;
      v_11 = Concatenate(v_11, ZERO(rem));
    }
    if (v_12.length < 8) {
      rem = 8 - v_12.length;
      v_12 = Concatenate(v_12, ZERO(rem));
    }
    if (v_13.length < 8) {
      rem = 8 - v_13.length;
      v_13 = Concatenate(v_13, ZERO(rem));
    }
    if (v_14.length < 8) {
      rem = 8 - v_14.length;
      v_14 = Concatenate(v_14, ZERO(rem));
    }
    if (v_15.length < 8) {
      rem = 8 - v_15.length;
      v_15 = Concatenate(v_15, ZERO(rem));
    }

    S0 = Concatenate(v_0, v_1);
    S1 = Concatenate(v_2, v_3);
    S2 = Concatenate(v_4, v_5);
    S3 = Concatenate(v_6, v_7);
    S4 = Concatenate(v_8, v_9);
    S5 = Concatenate(v_10, v_11);
    S6 = Concatenate(v_12, v_13);
    S7 = Concatenate(v_14, v_15);

    return [S0, S1, S2, S3, S4, S5, S6, S7];
  }

  function G(X, Y) {
    return new Promise(resolve => {
      let R = XOR(X, Y);
      let Q = [];
      let pp;
      let rN;
      let zzz;

      for (let index = 0; index < 8; index++) {
        rN = 128 * index;
        pp = P(R.slice(rN, rN + 16), R.slice(rN + 16, rN + 32), R.slice(rN + 32, rN + 48), R.slice(rN + 48, rN + 64), R.slice(rN + 64, rN + 80), R.slice(rN + 80, rN + 96), R.slice(rN + 96, rN + 112), R.slice(rN + 112, rN + 128));
        pp.forEach(ppItem => Q.push(...ppItem));
      }

      let Z = [];
      for (let index = 0; index < 8; index++) {
        rN = 16 * index;
        pp = P(Q.slice(rN, rN + 16), Q.slice(rN + 128, rN + 128 + 16), Q.slice(rN + 256, rN + 256 + 16), Q.slice(rN + 384, rN + 384 + 16), Q.slice(rN + 512, rN + 512 + 16), Q.slice(rN + 640, rN + 640 + 16), Q.slice(rN + 768, rN + 768 + 16), Q.slice(rN + 896, rN + 896 + 16));
        pp.forEach(ppItem => Q.push(...ppItem));
        for (let index = 0; index < pp.length; index++) Z = Concatenate(Z, pp[index]);
      }

      let ZZ = [];
      for (let index = 0; index < 8; index++) {
        rN = 16 * index;
        ZZ = Concatenate(ZZ, Z.slice(rN, rN + 16), Z.slice(rN + 128, rN + 128 + 16), Z.slice(rN + 256, rN + 256 + 16), Z.slice(rN + 384, rN + 384 + 16), Z.slice(rN + 512, rN + 512 + 16), Z.slice(rN + 640, rN + 640 + 16), Z.slice(rN + 768, rN + 768 + 16), Z.slice(rN + 896, rN + 896 + 16));
      }

      resolve(XOR(ZZ, R));
    });
  }

  function blake2bSetup(out_len, KEY = null) {
    context = new Blake2b().blake2bInit(out_len, KEY);
  }

  function getHash(H0, j, i) {
    const key = `hash${H0}_${j}_${i}`;
    if (memo[key]) {
      return memo[key];
    }
    const result = variableLengthHashFunction(1024, Concatenate(H0, LE32(j), LE32(i)));
    memo[key] = result;
    return result;
  }

  function variableLengthHashFunction(T, A) {
    if (T <= 64) {
      blake2bSetup(T);
      toHash = Concatenate(LE32(T), A);
      new Blake2b().blake2bUpdate(context, toHash);
      return new Blake2b().blake2bFinal(context);
    } else {
      var r = Math.ceil(T / 32) - 2;
      var toHash = Concatenate(LE32(T), A);
      blake2bSetup(64);
      new Blake2b().blake2bUpdate(context, toHash);
      var V = new Blake2b().blake2bFinal(context);
      var W = V.slice(0, 32);

      for (let index = 2; index <= r; index++) {
        blake2bSetup(64);
        new Blake2b().blake2bUpdate(context, V);
        V = new Blake2b().blake2bFinal(context);
        W = Concatenate(W, V.slice(0, 32));
      }

      var outLength = T - 32 * r;
      blake2bSetup(outLength);
      new Blake2b().blake2bUpdate(context, V);
      V = new Blake2b().blake2bFinal(context);
      return Concatenate(W, V);
    }
  }

  async function getAddressBlock(t, i, segment, m_prime, time_cost, type_code, ctr) {
    const key = `${t}_${i}_${segment}_${m_prime}_${time_cost}_${type_code}_${ctr}`;

    if (memo[key]) {
      return memo[key];
    }

    const A = Concatenate(LE64(t), LE64(i), LE64(segment), LE64(m_prime), LE64(time_cost), LE64(type_code), LE64(ctr), ZERO(968));
    const address_block = await G(ZERO(1024), await G(ZERO(1024), A));
    memo[key] = address_block;

    return address_block;
  }

  async function _fill_segment(B, t, segment, i, type_code, segment_length, H0, q, parallelism, m_prime, time_cost, version) {
    var data_independant = ((type_code == 1) || (type_code == 2 && t == 0 && segment <= 1));
    if (data_independant) {
      var pseudo_rands = [];
      var ctr = 0;

      while (pseudo_rands.length < segment_length) {
        ctr += 1;
        const address_block = await getAddressBlock(t, i, segment, m_prime, time_cost, type_code, ctr);
        for (let addr_i = 0; addr_i < 1024; addr_i += 8) pseudo_rands.push([Uint8ArrayToBigInt(address_block.slice(addr_i, addr_i + 4)), Uint8ArrayToBigInt(address_block.slice(addr_i + 4, addr_i + 8))]);
      }
    }

    for (let index = 0; index < segment_length; index++) {
      var j = segment * segment_length + index;
      if (t == 0 && j < 2) {
        B[i][j] = getHash(H0, j, i);
        continue;
      }

      var J1 = NaN; var J2 = NaN;
      if (data_independant) {
        J1 = pseudo_rands[index][0]; J2 = pseudo_rands[index][1];
      } else {
        J1 = extract(B[i][MOD(j - 1, q)], 0); J2 = extract(B[i][MOD(j - 1, q)], 1);
      }

      var i_prime = NaN;
      if (t == 0 && segment == 0) {
        i_prime = i;
      } else {
        i_prime = MOD(J2, BigInt(parallelism));
      }

      var ref_area_size = NaN;
      if (t == 0) {
        if (segment == 0 || i == i_prime) {
          ref_area_size = j - 1;
        } else if (index == 0) {
          ref_area_size = segment * segment_length - 1;
        } else {
          ref_area_size = segment * segment_length;
        }
      } else if (i == i_prime) {
        ref_area_size = q - segment_length + index - 1;
      } else if (index == 0) {
        ref_area_size = q - segment_length - 1;
      } else {
        ref_area_size = q - segment_length;
      }

      var rel_pos = (J1 ** BigInt(2)) >> BigInt(32);
      rel_pos = BigInt(ref_area_size) - BigInt(1) - ((BigInt(ref_area_size) * rel_pos) >> BigInt(32));
      var start_pos = 0;

      if (t != 0 && segment != 3) start_pos = (segment + 1) * segment_length;
      var j_prime = MOD((BigInt(start_pos) + rel_pos), BigInt(q));

      var new_block = await G(B[i][MOD(j - 1, q)], B[i_prime][j_prime]);
      if (t != 0 && version == 0x13) new_block = XOR(B[i][j], new_block);
      B[i][j] = new_block;
    }

    return B[i].slice(segment * segment_length, (segment + 1) * segment_length);
  }

  onmessage = function (e) {
    const { type, payload } = e.data;

    switch (type) {
      case 'fill-segment': {
        const { B, t, segment, i, y, segment_Length, H_0, q, p, mm, time_cost, v } = payload;
        _fill_segment(B, t, segment, i, y, segment_Length, H_0, q, p, mm, time_cost, v).then(result => {
          postMessage({
            type,
            payload,
            result,
          });
        });
        break;
      }
    }
  };
}

if (window != self) {
  runWorker();
}
