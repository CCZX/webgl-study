构成三维图形的基本图形都是三角形，二维图形也和三和图形类似

## 缓冲区对象

在上一节我们是向着色器attribute变量每次设置的一个变量，然后循环多次调用drawArrays来实现绘制多个点的。但是webGL提供了缓冲区，通过缓冲区可以向着色器传入多个顶点的数据。

使用缓冲区对象的步骤：p70
1. 创建缓冲区：gl.createBuffer()
2. 绑定缓冲区：gl.bindBuffer(target, buffer)
3. 想缓冲区写入数据：gl.bufferData(target, data, useage)
4. 将缓冲区分配给attribute变量：gl.vertexAttriPointer(location, size, type, normalize, stride, offset)
5. 启用attribute变量：gl.enableVertexAttriArray()

通过gl.drawArray()对缓冲区的数据进行绘制

## 给webGL中变量分配值

### 方法一
gl.vertexAttrib[1234]f()，这种方式一次只能向变量分配一个值，如果需要将整个数据一次性传递给变量就不行了

### 方法二
gl.vertexAttribPointer()，可以将整个缓冲区的数据分配给某个变量，详见 p75

## gl.drawArrays()

通过drawArrays我们可以指定不同模式的绘制，一共有7种模式的绘制：p82
1. 点：gl.POINTS
2. 线段：LINES
3. 线条：LINE_STRIP
4. 回路：gl.LINE_LOOP
5. 三角形：gl.TRIANGLES
6. 三角带：gl.TRIANGLES_STRIP
7. 三角扇：gl.TRIANGLES_FAN

## 移动旋转和缩放

1. 平移

在进行平移操作的时候需要把每个分量（x, y, z），加上图形在对应轴上平移的距离。比如将点p(x, y, z)移动到p(x', y', z')，假设在x, y, z三个轴方向的移动距离分别是Tx, Ty, Tz，那么将坐标上的对应分量加上这些在对应轴的方向的移动距离即可。

```
x' = x + Tx
y' = y + Ty
z' = z + Tz
```

对于在webgl中类型相同的变量可以直接相加，对于vec4的变量在执行加法操作的时候结果是对应每个分量相加的结果。

需要注意的是平移之后齐次坐标系齐次坐标的值必须是1.0，所以需要满足两个变量的 w1 + w2 = 1.0

2. 旋转

webGL属于右手系坐标，也就是说大拇指指向一个轴的正方向，其他手指就指明了旋转的方向，也就是正方向。

```
x' = xcosa - ysina
y' = xsina + ycosa
```

## 变换矩阵

矩阵乘法：https://www.bilibili.com/video/BV1K54y1d7VD?from=search&seid=6703642953780448338&spm_id_from=333.337.0.0

使用矩阵我们对矢量的坐标进行转换，转换公式：

```
变换后的矢量坐标 = 变换矩阵 * 变换前的矢量坐标
```

常见的变换矩阵有：旋转矩阵，平移矩阵，缩放矩阵

## 主序

由于JavaScript中没有matrix类型的数据，所以我们使用类型数组Float32Array来存储每一个元素，然后传递给webGL的矩阵，比如：
```js
const xformMatrix = new Float32Array([
  cosB,  sinB, 0.0, 0.0,
  -sinB, cosB, 0.0, 0.0,
  0.0,   0.0,  1.0, 0.0,
  0.0,   0.0,  0.0, 1.0,
])
```

但是matrix类型的数据是按行和列进行排序的，而Float32Array只能排成一行，那么webGL是怎么知道每一行和每一列的数据的呢。这里我们可以按照两种方式在数组中存储矩阵元素：**列主序、行主序。而webGL是按照列主序读取的，**
