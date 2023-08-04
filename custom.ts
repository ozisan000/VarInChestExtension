
/**
* このファイルを使って、独自の関数やブロックを定義してください。
* 詳しくはこちらを参照してください：https://minecraft.makecode.com/blocks/custom
*/

enum MyEnum {
    //% block="one"
    One,
    //% block="two"
    Two
}

/**
 * Custom blocks
 */
//% weight=100 color=#0fbc11 icon="C"
namespace Number {
    // =========================
    // 1:VariableInChest Code
    // =========================
    /**
     * TODO: 10進数の数字をbase進数に変換します
     * @param cal describe parameter here, eg: 128
     */
    //% block
    export function Base10toNumber(cal: number, base: number): number[] {
        let calList = []
        // ビットが出力される配列
        let bufferList = []
        player.say(" ")
        player.say("---Base10to" + base + " Start---")
        while (cal >= 1) {
            player.say("number:" + cal % base + " cal:" + cal / base)
            bufferList.push(cal % base)
            cal = Math.floor(cal / base)
        }
        // 小数点以下を切り捨て
        let j = 0
        for (let i of _py.slice(bufferList, null, null, -1)) {
            // 生成されたビット列を反転し結果を文字列に変換
            calList[j] = i
            j += 1
        }
        player.say("--Base10to" + base + " result--")
        player.say(calList)
        player.say("--Base10to" + base + " End--")
        player.say(" ")
        return calList
    }

    // アイテムをチェストに設置するコマンド
    /**
     * TODO: replaceitem block コマンドを用いてアイテムをチェストに配置します
     * @param item_name describe parameter here, eg: "diamond"
     */
    //% block
    export function SetItemInChest(item_name: string, slot: number, item_count: number, chest_pos_x: number, chest_pos_y: number, chest_pos_z: number) {
        player.execute("replaceitem block " + chest_pos_x + " " + chest_pos_y + " " + chest_pos_z + " slot.container " + slot + " " + item_name + " " + item_count)
    }

    // 変数の値をチェストに入れるメソッド(Pythonのコマンドのようなもの)
    // (チェストに入れたい数,設置したいチェストのX座標,設置したいチェストのY座標,設置したいチェストのZ座標)
        /**
     * TODO: 特定の値をマインクラフトのアイテムに変換しチェストに入れます
     * @param item_name describe parameter here, eg: "diamond"
     * @param result describe parameter here, eg: 158
     */
    //% block
    export function VarInChest(item_name: string, result: number, chest_pos_x: number, chest_pos_y: number, chest_pos_z: number): number {
        let chestPos: Position;
        let startPos: Position;
        let endPos: Position;
        let conversionList: number[];
        let i: number;
        if (result <= 1728) {
            // 特定の値を初期化（チェストを消して中身をマグマで消去）
            chestPos = world(chest_pos_x, chest_pos_y, chest_pos_z)
            startPos = world(chest_pos_x - 1, chest_pos_y, chest_pos_z + 1)
            endPos = world(chest_pos_x + 1, chest_pos_y + 2, chest_pos_z - 1)
            blocks.fill(LAVA, startPos, endPos, FillOperation.Replace)
            blocks.fill(AIR, startPos, endPos, FillOperation.Replace)
            blocks.place(CHEST, chestPos)
            conversionList = []
            i = 0
            conversionList = Base10toNumber(result, 64)
            // 64進数に変換
            // listの長さが1以上の場合1スロット以上64の値が入っている
            if (1 < conversionList.length) {
                // 64を順番にスロットにアイテムを入れる
                for (i = 0; i < conversionList[0]; i += 1) {
                    if (i == conversionList[0]) {
                        break
                    }
                    
                    SetItemInChest(item_name, i, 64, chest_pos_x, chest_pos_y, chest_pos_z)
                }
                // 残った値を最後のスロットにアイテムを入れる
                SetItemInChest(item_name, i, conversionList[1], chest_pos_x, chest_pos_y, chest_pos_z)
            } else {
                // 0スロットにアイテムを入れる
                SetItemInChest(item_name, 0, result, chest_pos_x, chest_pos_y, chest_pos_z)
            }
            
        } else {
            player.say("The computable value has been exceeded!!")
        }
        
        // 変数を返す(計算できるように値を返してあげる)
        return result
    }


}
