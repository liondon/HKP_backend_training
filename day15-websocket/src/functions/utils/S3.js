const AWS = require('aws-sdk')

const s3Client = new AWS.S3()

const S3 = {
  // async get(ID, TableName) {
  //   const params = {
  //     TableName,
  //     Key: {
  //       ID
  //     }
  //   }
  //   const data = await documentClient.get(params).promise()

  //   if (!data || !data.Item) {
  //     throw Error(`There was an err fetching data of ID=${ID} from ${TableName}`)
  //   }

  //   console.log(data)
  //   return data.Item
  // },

  async create(data, fileName, bucketName) {
    const params = {
      Bucket: bucketName,
      Body: JSON.stringify(data),
      Key: fileName
    }

    const res = await s3Client.putObject(params).promise()

    if (!res) {
      throw Error(`There was an error creating fileName=${fileName} in bucket=${bucketName}`)
    }
    return res
  }
}

module.exports = S3
