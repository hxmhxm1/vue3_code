//进行打包  monerepo  获取到 需要打包的包
// (1)获取 打包 目录
const fs = require('fs');
const execa = require('execa');
// import execa from '../node_modules/execa'
const dirs = fs.readdirSync('packages').filter(p => {
    if (!fs.statSync(`packages/${p}`).isDirectory()) {
        return false
    }
    return true
})
//2 进行打包  并行打包 
async function build(target){ 
    console.log(target,3333)
 // 注意 execa  -c 执行rullup配置 ， 环境变量 -env 
    await execa('rollup',['-c',"--environment",`TARGET:${target}`],{stdio:'inherit'}) // 子进程的输出在父包中输出
}
async function runParaller(dirs, itemfn) {
    //遍历
    let result = []
    for (let item of dirs) {
        result.push(itemfn(item))
    }
    return Promise.all(result) // 存放打包的promise ,等待这里的打包执行完毕之后，调用成功
}
runParaller(dirs, build).then(() => { //promise
    console.log('成功')
})
//注意  文件夹
console.log(dirs)