export default {
    arrayEqual(x, y) {
        if (!Array.isArray(x)) return false;
        if (!Array.isArray(y)) return false;
        if (x.length != y.length) return false;
        for (const item of x) {
            if (!y.includes(item)) return false;
        }
        return true;
    },
    // recruitmentフォームにて、既存のデータと入力データに変更があったかを確認する際に必要となる相当の真偽を返す関数
    recruitmentsEqual(x, y) {
        // 1. kindの相当のみを考慮する
        const a = x.map(item => item.kind);
        const b = y.map(item => item.kind);
        const kindEquality = this.arrayEqual(a, b);
        
        // kindの時点で等しくない場合はここでreturn
        if (!kindEquality) 
            return false;

        // 2. numberの比較をする
        for (const item of x) {
            // 数が異なる要素を見つけ次第falseを返す
            const matchItem = y.find(elem => elem.kind === item.kind);
            if (matchItem.number !== item.number) {
                return false;
            }
        }
        return true;
    },
    // 数値配列の平均値を計算
    calcArrayMean(arr) {
        const sum = arr.reduce((s, e) => s + e);
        const mean = sum / arr.length;
        return mean;
    },
}