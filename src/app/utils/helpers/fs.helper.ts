import checkdisk from 'check-disk-space';

class FsHelper {
  static async getDiskSpace() {
    const baseDir = String(process.env.BASE_DIR);
    const disk = await checkdisk(baseDir);

    return {
      total: Number((disk.size / Math.pow(10, 9)).toFixed(2)),
      used: Number(((disk.size - disk.free) / Math.pow(10, 9)).toFixed(2)),
    };
  }
}

export { FsHelper };
