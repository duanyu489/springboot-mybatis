package com.dy.util;

import java.io.FileInputStream;
import java.security.DigestInputStream;
import java.security.MessageDigest;

public class MD5Util {

    private static MessageDigest md5 = null;
    static
    {
        try
        {
            md5 = MessageDigest.getInstance("MD5");
        }
        catch (Exception e)
        {
            System.out.println(e.getMessage());
        }
    }

    /**
     * 用于获取一个String的md5值
     *
     * @param string
     * @return
     */
    public static String getMd5(String str)
    {
        byte[] bs = md5.digest(str.getBytes());
        StringBuilder sb = new StringBuilder(40);
        for (byte x : bs)
        {
            if ((x & 0xff) >> 4 == 0)
            {
                sb.append("0").append(Integer.toHexString(x & 0xff));
            }
            else
            {
                sb.append(Integer.toHexString(x & 0xff));
            }
        }
        return sb.toString();
    }

    /**
     * 文件md5
     *  @param inputFile
     *  @return
     *  @author ms
     */
    public static String fileMD5(String inputFile)
    {
// 缓冲区大小（这个可以抽出一个参数）
        int bufferSize = 256 * 1024;
        FileInputStream fileInputStream = null;
        DigestInputStream digestInputStream = null;
        try
        {
// 拿到一个MD5转换器（同样，这里可以换成SHA1）
            MessageDigest messageDigest = MessageDigest.getInstance("MD5");
// 使用DigestInputStream
            fileInputStream = new FileInputStream(inputFile);
            digestInputStream = new DigestInputStream(fileInputStream, messageDigest);
// read的过程中进行MD5处理，直到读完文件
            byte[] buffer = new byte[bufferSize];
            while (digestInputStream.read(buffer) > 0);
// 获取最终的MessageDigest
            messageDigest = digestInputStream.getMessageDigest();
// 拿到结果，也是字节数组，包含16个元素
            byte[] resultByteArray = messageDigest.digest();
// 同样，把字节数组转换成字符串
            return byteArrayToHex(resultByteArray);
        }
        catch (Exception e)
        {
            return null;
        }
        finally
        {
            try
            {
                digestInputStream.close();
            }
            catch (Exception e)
            {
                e.printStackTrace();
            }
            try
            {
                fileInputStream.close();
            }
            catch (Exception e)
            {
                e.printStackTrace();
            }
        }
    }

    public static String byteArrayToHex(byte[] b)
    {
        String hs = "";
        String stmp = "";
        for (int n = 0; n < b.length; n++)
        {
            stmp = (Integer.toHexString(b[n] & 0XFF));
            if (stmp.length() == 1)
            {
                hs = hs + "0" + stmp;
            }
            else
            {
                hs = hs + stmp;
            }
            if (n < b.length - 1)
            {
                hs = hs + "";
            }
        }
        return hs;

    }
}
